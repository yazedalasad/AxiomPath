import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput,
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../config/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TestListScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    filterTests();
  }, [searchQuery, selectedCategory, tests]);

  const fetchTests = async () => {
    try {
      const testsRef = collection(database, 'tests');
      const q = query(
        testsRef, 
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      
      const querySnapshot = await getDocs(q);
      const testsData = [];
      
      querySnapshot.forEach((doc) => {
        testsData.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setTests(testsData);
    } catch (error) {
      console.error('Error fetching tests:', error);
      Alert.alert('Error', 'Failed to load tests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterTests = () => {
    let filtered = tests;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(test => 
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(test => test.category === selectedCategory);
    }

    setFilteredTests(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTests();
  };

  const getCategories = () => {
    const categories = ['all', ...new Set(tests.map(test => test.category))];
    return categories;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#666';
    }
  };

  const renderTestItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.testItem}
      onPress={() => navigation.navigate('Test', { testId: item.id })}
    >
      <View style={styles.testHeader}>
        <Text style={styles.testTitle}>{item.title}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>
            {item.difficulty?.charAt(0).toUpperCase() + item.difficulty?.slice(1)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.testDescription}>{item.description}</Text>
      
      <View style={styles.testDetails}>
        <Text style={styles.detailText}>📝 {item.questions?.length || 0} questions</Text>
        <Text style={styles.detailText}>⏱ {item.duration} minutes</Text>
        <Text style={styles.detailText}>👥 {item.stats?.totalAttempts?.length || 0} attempts</Text>
      </View>

      <View style={styles.testFooter}>
        <Text style={styles.categoryText}>{item.category}</Text>
        {item.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PREMIUM</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading tests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Tests</Text>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search tests..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Category Filter */}
      <FlatList
        horizontal
        data={getCategories()}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === item && styles.categoryButtonTextActive
            ]}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
      />

      {/* Tests List */}
      <FlatList
        data={filteredTests}
        renderItem={renderTestItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No tests found</Text>
            <Text style={styles.emptyStateSubtext}>
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No tests available at the moment'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16
  },
  categoriesList: { marginBottom: 20 },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10
  },
  categoryButtonActive: { backgroundColor: '#007AFF' },
  categoryButtonText: { color: '#666', fontWeight: '500' },
  categoryButtonTextActive: { color: 'white' },
  testItem: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF'
  },
  testHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 10
  },
  testTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, color: '#333' },
  difficultyBadge: { 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 12,
    marginLeft: 10
  },
  difficultyText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  testDescription: { 
    color: '#666', 
    marginBottom: 15,
    lineHeight: 20
  },
  testDetails: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 15
  },
  detailText: { color: '#888', fontSize: 14 },
  testFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryText: { 
    color: '#007AFF', 
    fontWeight: '500',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10
  },
  premiumText: { 
    color: '#333', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  emptyState: { 
    alignItems: 'center', 
    marginTop: 50,
    padding: 20
  },
  emptyStateText: { 
    fontSize: 18, 
    color: '#666', 
    marginBottom: 10 
  },
  emptyStateSubtext: { 
    fontSize: 14, 
    color: '#999', 
    textAlign: 'center' 
  },
  loadingText: { 
    marginTop: 10, 
    color: '#666' 
  }
});

export default TestListScreen;
