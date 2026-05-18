import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Typography } from '../theme/theme';

export default function AICoachScreen() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: "Hi! I'm your AI Fitness Coach. Ask me anything about exercise or diet!", sender: 'ai' }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now().toString(), text: query, sender: 'user' }];
    setMessages(newMessages);
    setQuery('');

    // Simulate AI response (In production, connect to an API like OpenAI/Gemini)
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          id: (Date.now() + 1).toString(), 
          text: "That's a great question! For optimal results, ensure your diet supports your workout intensity. (This is a simulated AI response.)", 
          sender: 'ai' 
        }
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>AI Coach</Text>

      <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
        {messages.map(msg => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble, 
              msg.sender === 'user' ? styles.userBubble : styles.aiBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask about diet or exercise..."
          placeholderTextColor={Colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    ...Typography.header,
    marginBottom: 10,
  },
  chatArea: {
    flex: 1,
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: '85%',
  },
  userBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  aiBubble: {
    backgroundColor: Colors.card,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  messageText: {
    color: Colors.text,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 50,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
