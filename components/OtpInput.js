import React, { useEffect, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpInput = ({ otp, setOtp, onSubmit, hasError }) => {
  const inputs = useRef([]);

  // Auto-submit when all 4 digits filled
  useEffect(() => {
    const code = otp.join("");
    if (code.length === 4) {
      onSubmit(code);
    }
  }, [otp]);

  const handleChange = (text, index) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={index === 0}
          style={[
            styles.input,
            { borderColor: hasError ? "red" : "#ccc" }
          ]}
        />
      ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  input: {
    width: 55,
    height: 55,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 22
  }
});
