import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  // kiểm tra định dạng số điện thoại
  const validatePhone = (number: string): boolean => {
    const regex = /^(0[0-9]{9})$/;
    return regex.test(number);
  };

  // format số điện thoại khi nhập
  const formatPhone = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");
    return cleaned;
  };

  // xử lý khi nhập
  const handleChange = (text: string): void => {
    const formatted = formatPhone(text);
    setPhone(formatted);

    if (formatted.length === 0) {
      setError("");
    } else if (!validatePhone(formatted)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError("");
    }
  };

  // xử lý khi bấm nút
  const handleSubmit = (): void => {
    if (!validatePhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không đúng định dạng");
    } else {
      Alert.alert("Thành công", "Số điện thoại hợp lệ");
    }
  };

  // useEffect chạy khi phone thay đổi
  useEffect(() => {
    console.log("Phone changed:", phone);
  }, [phone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="numeric"
        value={phone}
        onChangeText={handleChange}
        maxLength={10}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Tiếp tục" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 16,
  },

  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
});