import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ProgressBarAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProjectDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock project data
  const projectData = {
    name: 'Campanha de Marketing Digital',
    status: 'Em Andamento',
    startDate: '01/06/2023',
    deadline: '30/07/2023',
    progress: 65,
    description: 'Campanha completa de marketing digital incluindo gestão de redes sociais, criação de conteúdo e estratégia de SEO.',
    team: [
      { id: 1, name: 'Ana Silva', role: 'Gerente de Projeto' },
      { id: 2, name: 'Carlos Santos', role: 'Designer' },
      { id: 3, name: 'Maria Oliveira', role: 'Copywriter' },
    ],
    milestones: [
      { id: 1, title: 'Planejamento Estratégico', status: 'completed', date: '05/06/2023' },
      { id: 2, title: 'Design de Posts', status: 'in-progress', date: '15/06/2023' },
      { id: 3, title: 'Criação de Conteúdo', status: 'in-progress', date: '20/06/2023' },
      { id: 4, title: 'Otimização SEO', status: 'pending', date: '01/07/2023' },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View>
            <Text style={styles.description}>{projectData.description}</Text>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Icon name="calendar-alt" size={20} color="#6C63FF" />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Início</Text>
                  <Text style={styles.infoValue}>{projectData.startDate}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Icon name="flag-checkered" size={20} color="#6C63FF" />
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Prazo</Text>
                  <Text style={styles.infoValue}>{projectData.deadline}</Text>
                </View>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Progresso Geral</Text>
                <Text style={styles.progressPercentage}>{projectData.progress}%</Text>
              </View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={projectData.progress / 100}
                  color="#6C63FF"
                />
              ) : (
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${projectData.progress}%` }]} />
                </View>
              )}
            </View>
          </View>
        );
      
      case 'team':
        return (
          <View style={styles.teamContainer}>
            {projectData.team.map(member => (
              <View key={member.id} style={styles.teamMember}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.avatarText}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRole}>{member.role}</Text>
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'milestones':
        return (
          <View style={styles.milestonesContainer}>
            {projectData.milestones.map(milestone => (
              <View key={milestone.id} style={styles.milestone}>
                <View style={[
                  styles.milestoneStatus,
                  { backgroundColor: milestone.status === 'completed' ? '#4CAF50' :
                                   milestone.status === 'in-progress' ? '#6C63FF' : '#9CA3AF' }
                ]} />
                <View style={styles.milestoneInfo}>
                  <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                  <Text style={styles.milestoneDate}>{milestone.date}</Text>
                </View>
                <Icon 
                  name={milestone.status === 'completed' ? 'check-circle' : 'circle'} 
                  size={20} 
                  color={milestone.status === 'completed' ? '#4CAF50' : '#9CA3AF'}
                />
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.projectName}>{projectData.name}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{projectData.status}</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Visão Geral
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'team' && styles.activeTab]}
          onPress={() => setActiveTab('team')}
        >
          <Text style={[styles.tabText, activeTab === 'team' && styles.activeTabText]}>
            Equipe
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'milestones' && styles.activeTab]}
          onPress={() => setActiveTab('milestones')}
        >
          <Text style={[styles.tabText, activeTab === 'milestones' && styles.activeTabText]}>
            Marcos
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {renderTabContent()}
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
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    paddingVertical: 15,
    marginRight: 30,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    flex: 0.48,
  },
  infoText: {
    marginLeft: 12,
  },
  infoLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressPercentage: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
  teamContainer: {
    marginTop: 10,
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  memberInfo: {
    marginLeft: 15,
  },
  memberName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  memberRole: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 4,
  },
  milestonesContainer: {
    marginTop: 10,
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  milestoneStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  milestoneDate: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 4,
  },
});

export default ProjectDetailsScreen;
