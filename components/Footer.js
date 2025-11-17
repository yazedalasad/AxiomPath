import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        <FontAwesome name="graduation-cap" size={24} color="#27ae60" /> I3dad
      </Text>
      <Text style={styles.tagline}>تمكين الطلاب العرب الإسرائيليين منذ 2024</Text>
      
      <View style={styles.socialLinks}>
        <TouchableOpacity>
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="instagram" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="linkedin" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="twitter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.footerLinks}>
        <Text style={styles.link}>من نحن</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.link}>سياسة الخصوصية</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.link}>تواصل معنا</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.link}>دعم</Text>
      </View>

      <Text style={styles.copyright}>
        © 2024 I3dad. جميع الحقوق محفوظة. | صنع بـ 
        <FontAwesome name="heart" size={14} color="#27ae60" /> 
        للطلاب العرب الإسرائيليين
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    padding: 32,
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 14,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  link: {
    color: '#fff',
    fontSize: 12,
  },
  separator: {
    color: '#fff',
    opacity: 0.5,
  },
  copyright: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 10,
  },
});
