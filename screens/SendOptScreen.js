import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { sendOtp } from "../api/auth";
import { validateMobile, sanitizeMobile } from "../utils/validation";

const SendOtpScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setError("");

    if (!validateMobile(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(mobile);
      navigation.navigate("Verify", { mobile });
    } catch (err) {
      setError(err || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Mobile Number</Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: error ? "red" : "#ccc" }
        ]}
        value={mobile}
        onChangeText={(text) => setMobile(sanitizeMobile(text))}
        keyboardType="number-pad"
        maxLength={10}
        placeholder="Enter 10-digit number"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Send OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SendOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24
  },
  title: {
    fontSize: 22,
    marginBottom: 20
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    fontSize: 18
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontSize: 18
  },
  error: {
    color: "red",
    marginTop: 10
  }
});
