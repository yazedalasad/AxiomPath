import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function FeatureCard({ feature }) {
  return (
    <View style={styles.card}>
      <FontAwesome name={feature.icon} size={40} color="#27ae60" style={styles.icon} />
      <Text style={styles.title}>{feature.title}</Text>
      <Text style={styles.description}>{feature.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  description: {
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 20,
  },
});
