import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DashboardScreen = ({ navigation }) => {
  // Mock data for the chart
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      data: [20, 45, 28, 80, 99, 43],
    }],
  };

  // Mock project timeline data
  const timelineData = [
    {
      id: 1,
      title: 'Briefing Finalizado',
      date: '10 Jun 2023',
      status: 'completed',
      icon: 'check-circle',
    },
    {
      id: 2,
      title: 'Design em Andamento',
      date: '12 Jun 2023',
      status: 'in-progress',
      icon: 'paint-brush',
    },
    {
      id: 3,
      title: 'Revisão do Cliente',
      date: '15 Jun 2023',
      status: 'pending',
      icon: 'eye',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Olá, Cliente!</Text>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Icon name="comments" size={24} color="#6C63FF" />
          <Text style={styles.actionText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ProjectDetails')}
        >
          <Icon name="tasks" size={24} color="#6C63FF" />
          <Text style={styles.actionText}>Projeto</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ServiceCatalog')}
        >
          <Icon name="store" size={24} color="#6C63FF" />
          <Text style={styles.actionText}>Serviços</Text>
        </TouchableOpacity>
      </View>

      {/* Project Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timeline do Projeto</Text>
        <View style={styles.timeline}>
          {timelineData.map((item, index) => (
            <View key={item.id} style={styles.timelineItem}>
              <View style={[
                styles.timelineIcon,
                { backgroundColor: item.status === 'completed' ? '#4CAF50' : 
                                 item.status === 'in-progress' ? '#6C63FF' : '#9CA3AF' }
              ]}>
                <Icon name={item.icon} size={16} color="#FFF" />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineDate}>{item.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Performance Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas de Desempenho</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1a1a2e',
            backgroundGradientFrom: '#1a1a2e',
            backgroundGradientTo: '#1a1a2e',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Recent Updates */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Atualizações Recentes</Text>
        <View style={styles.updateCard}>
          <Icon name="bell" size={20} color="#6C63FF" />
          <View style={styles.updateContent}>
            <Text style={styles.updateTitle}>Nova versão do design disponível</Text>
            <Text style={styles.updateTime}>Há 2 horas</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    width: '28%',
  },
  actionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  section: {
    padding: 20,
  },
  lastSection: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  timeline: {
    marginTop: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  updateCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  updateContent: {
    marginLeft: 15,
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  updateTime: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default DashboardScreen;
