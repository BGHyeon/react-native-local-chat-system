/**
 * ChatInput 컴포넌트
 * - 사용자로부터 메시지를 입력받는 텍스트 입력창과 전송 버튼으로 구성
 * - 다중 행 입력 지원, 전송 시 입력값을 부모로 전달하고 입력창 초기화
 * - 키보드가 올라올 때 UI가 가려지지 않도록 KeyboardAvoidingView 사용
 * - disabled props로 입력 및 전송 버튼 활성화/비활성화 가능
 */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type ChatInputProps = {
  onSend: (message: string) => void; // 메시지 전송 콜백
  placeholder?: string;
  disabled?: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = '메시지를 입력하세요...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed.length > 0) {
      onSend(trimmed);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={80}
      style={styles.container}
    >
      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={message}
          onChangeText={setMessage}
          editable={!disabled}
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={disabled}
        >
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    backgroundColor: '#fff',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#a0cfff',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
