import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import SmsRetriever from "react-native-sms-retriever";
import { verifyOtp, resendOtp } from "../api/auth";
import { validateOtp } from "../utils/validation";
import OtpInput from "../components/OtpInput";

const VerifyOtpScreen = ({ route, navigation }) => {
  const { mobile } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(60);

  // -----------------------
  // Auto read SMS
  // -----------------------
  useEffect(() => {
    SmsRetriever.startSmsRetriever().then(() => {
      SmsRetriever.addSmsListener(event => {
        const match = event.message.match(/\d{4}/);
        if (match) {
          const code = match[0];
          setOtp(code.split(""));
          submitOtp(code);
        }
      });
    });

    return () => SmsRetriever.removeSmsListener();
  }, []);

  // -----------------------
  // Resend Timer
  // -----------------------
  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // -----------------------
  // Verify OTP
  // -----------------------
  const submitOtp = async (code) => {
    setError("");

    if (!validateOtp(code)) {
      setError("Enter a valid 4-digit OTP");
      return;
    }

    try {
      setLoading(true);
      await verifyOtp(mobile, code);
      Alert.alert("Success", "Login successful");
    } catch (err) {
      setError(err || "Invalid OTP");
      setOtp(["", "", "", ""]);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Resend OTP
  // -----------------------
  const handleResend = async () => {
    try {
      setTime(60);
      await resendOtp(mobile);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Sent to {mobile}</Text>

      <OtpInput
        otp={otp}
        setOtp={setOtp}
        onSubmit={submitOtp}
        hasError={!!error}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

      <TouchableOpacity
        disabled={time > 0}
        onPress={handleResend}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: time > 0 ? "#999" : "#000" }}>
          {time > 0 ? `Resend OTP in ${time}s` : "Resend OTP"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.change}>Change number</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    marginBottom: 10
  },
  subtitle: {
    color: "#666",
    marginBottom: 20
  },
  error: {
    color: "red",
    marginTop: 10
  },
  change: {
    marginTop: 30,
    color: "blue"
  }
});
