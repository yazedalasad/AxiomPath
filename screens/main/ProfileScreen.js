import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ user, onLogout }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Text>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="person" size={20} color="#6366F1" />
          <Text style={styles.infoLabel}>Full Name:</Text>
          <Text style={styles.infoValue}>
            {user?.firstName} {user?.lastName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="school" size={20} color="#10B981" />
          <Text style={styles.infoLabel}>Student ID:</Text>
          <Text style={styles.infoValue}>{user?.studentId}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color="#F59E0B" />
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color="#EF4444" />
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{user?.phone}</Text>
        </View>
      </View>

      <View style={styles.actionsCard}>
        <TouchableOpacity style={styles.actionButton} onPress={onLogout}>
          <Ionicons name="log-out" size={20} color="#EF4444" />
          <Text style={[styles.actionText, { color: '#EF4444' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#94A3B8',
  },
  infoCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366F1',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 12,
    marginRight: 8,
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#F8FAFC',
    flex: 1,
  },
  actionsCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginBottom: 40,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#F8FAFC',
    marginLeft: 12,
  },
});