import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatMode, setChatMode] = useState('team'); // 'team' or 'ai'
  const scrollViewRef = useRef();

  // Mock chat messages
  const [messages] = useState([
    {
      id: 1,
      text: 'Olá! Como posso ajudar você hoje?',
      sender: 'team',
      name: 'Ana Silva',
      timestamp: '09:30',
    },
    {
      id: 2,
      text: 'Gostaria de saber sobre o andamento do projeto.',
      sender: 'user',
      timestamp: '09:31',
    },
    {
      id: 3,
      text: 'Claro! O design está em fase final de aprovação. Devo enviar uma prévia ainda hoje.',
      sender: 'team',
      name: 'Ana Silva',
      timestamp: '09:32',
    },
  ]);

  // Mock AI messages
  const [aiMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o assistente virtual da One Take. Como posso ajudar?',
      sender: 'ai',
      timestamp: '09:30',
    },
    {
      id: 2,
      text: 'Preciso de sugestões para melhorar o engajamento nas redes sociais.',
      sender: 'user',
      timestamp: '09:31',
    },
    {
      id: 3,
      text: 'Com base na análise do seu perfil, sugiro: 1) Aumentar a frequência de posts com conteúdo interativo, 2) Utilizar mais recursos visuais como carrosséis e reels, 3) Implementar uma estratégia de hashtags mais direcionada ao seu público.',
      sender: 'ai',
      timestamp: '09:32',
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      // For now, we'll just clear the input
      setMessage('');
    }
  };

  const renderMessage = (msg, isAiChat) => (
    <View 
      key={msg.id} 
      style={[
        styles.messageContainer,
        msg.sender === 'user' ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {msg.sender !== 'user' && (
        <View style={styles.senderInfo}>
          {isAiChat ? (
            <Icon name="robot" size={16} color="#6C63FF" />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {msg.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
          )}
          <Text style={styles.senderName}>
            {isAiChat ? 'AI Assistente' : msg.name}
          </Text>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        msg.sender === 'user' ? styles.userBubble : styles.otherBubble,
      ]}>
        <Text style={[
          styles.messageText,
          msg.sender === 'user' ? styles.userMessageText : styles.otherMessageText,
        ]}>
          {msg.text}
        </Text>
      </View>
      
      <Text style={styles.timestamp}>{msg.timestamp}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Chat Mode Selector */}
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, chatMode === 'team' && styles.activeModeButton]}
          onPress={() => setChatMode('team')}
        >
          <Icon 
            name="users" 
            size={16} 
            color={chatMode === 'team' ? '#6C63FF' : '#9CA3AF'} 
          />
          <Text style={[
            styles.modeButtonText,
            chatMode === 'team' && styles.activeModeButtonText
          ]}>
            Equipe One Take
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.modeButton, chatMode === 'ai' && styles.activeModeButton]}
          onPress={() => setChatMode('ai')}
        >
          <Icon 
            name="robot" 
            size={16} 
            color={chatMode === 'ai' ? '#6C63FF' : '#9CA3AF'} 
          />
          <Text style={[
            styles.modeButtonText,
            chatMode === 'ai' && styles.activeModeButtonText
          ]}>
            AI Assistente
          </Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {(chatMode === 'team' ? messages : aiMessages).map(msg => 
          renderMessage(msg, chatMode === 'ai')
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder={chatMode === 'team' ? "Digite sua mensagem..." : "Faça uma pergunta ao AI Assistente..."}
          placeholderTextColor="#9CA3AF"
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Icon name="paper-plane" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  modeSelector: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeModeButton: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
  },
  modeButtonText: {
    color: '#9CA3AF',
    marginLeft: 8,
    fontSize: 14,
  },
  activeModeButtonText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    marginBottom: 20,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  senderName: {
    color: '#9CA3AF',
    fontSize: 12,
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#6C63FF',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    color: '#fff',
    maxHeight: 100,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(108, 99, 255, 0.5)',
  },
});

export default ChatScreen;
