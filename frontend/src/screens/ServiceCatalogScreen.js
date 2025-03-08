import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ServiceCatalogScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock services data
  const services = [
    {
      id: 1,
      name: 'Gestão de Redes Sociais',
      category: 'social',
      description: 'Gerenciamento completo das suas redes sociais com estratégia personalizada.',
      icon: 'instagram',
      features: ['Planejamento de Conteúdo', 'Design de Posts', 'Relatórios Mensais'],
      price: 'A partir de R$ 1.500/mês',
    },
    {
      id: 2,
      name: 'Criação de Conteúdo',
      category: 'content',
      description: 'Produção de conteúdo relevante e engajador para sua marca.',
      icon: 'pen-fancy',
      features: ['Copywriting', 'Fotografia', 'Produção de Vídeo'],
      price: 'A partir de R$ 2.000/mês',
    },
    {
      id: 3,
      name: 'Otimização SEO',
      category: 'marketing',
      description: 'Melhore seu posicionamento nos mecanismos de busca.',
      icon: 'search',
      features: ['Análise Técnica', 'Otimização de Conteúdo', 'Link Building'],
      price: 'A partir de R$ 1.800/mês',
    },
    {
      id: 4,
      name: 'Marketing de Performance',
      category: 'marketing',
      description: 'Campanhas focadas em resultados e conversões.',
      icon: 'chart-line',
      features: ['Google Ads', 'Facebook Ads', 'Analytics'],
      price: 'A partir de R$ 2.500/mês',
    },
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: 'th-large' },
    { id: 'social', name: 'Social', icon: 'share-alt' },
    { id: 'content', name: 'Conteúdo', icon: 'file-alt' },
    { id: 'marketing', name: 'Marketing', icon: 'bullhorn' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const renderServiceCard = (service) => (
    <View key={service.id} style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View style={styles.serviceIcon}>
          <Icon name={service.icon} size={24} color="#6C63FF" />
        </View>
        <Text style={styles.serviceName}>{service.name}</Text>
      </View>
      
      <Text style={styles.serviceDescription}>{service.description}</Text>
      
      <View style={styles.featuresList}>
        {service.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check" size={14} color="#4CAF50" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.serviceFooter}>
        <Text style={styles.servicePrice}>{service.price}</Text>
        <TouchableOpacity style={styles.quoteButton}>
          <Text style={styles.quoteButtonText}>Solicitar Orçamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon 
              name={category.icon} 
              size={16} 
              color={selectedCategory === category.id ? '#6C63FF' : '#9CA3AF'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Services List */}
      <ScrollView 
        style={styles.servicesContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredServices.map(service => renderServiceCard(service))}
        
        {/* Contact Card */}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Precisa de algo personalizado?</Text>
          <Text style={styles.contactText}>
            Entre em contato conosco para desenvolvermos uma solução sob medida para sua empresa.
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="envelope" size={16} color="#fff" />
            <Text style={styles.contactButtonText}>Falar com um Consultor</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedCategory: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
  },
  categoryText: {
    color: '#9CA3AF',
    marginLeft: 8,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  servicesContainer: {
    padding: 20,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    marginBottom: 15,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  serviceFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
  },
  servicePrice: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '600',
    marginBottom: 10,
  },
  quoteButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quoteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  contactButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ServiceCatalogScreen;
