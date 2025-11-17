import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomPicker({
  label,
  value,
  onValueChange,
  items,
  placeholder = 'اختر...',
  error,
  icon,
  searchable = false,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder;

  const filteredItems = searchable && searchQuery
    ? items.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const handleSelect = (itemValue) => {
    onValueChange(itemValue);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.pickerButton,
          error && styles.pickerButtonError,
        ]}
        onPress={() => setModalVisible(true)}
      >
        {icon && (
          <FontAwesome
            name={icon}
            size={20}
            color={error ? '#e74c3c' : '#94A3B8'}
            style={styles.icon}
          />
        )}
        <Text style={[
          styles.pickerText,
          !selectedItem && styles.placeholderText,
        ]}>
          {displayText}
        </Text>
        <FontAwesome
          name="chevron-down"
          size={16}
          color="#94A3B8"
          style={styles.chevron}
        />
      </TouchableOpacity>

      {error && (
        <View style={styles.errorContainer}>
          <FontAwesome name="exclamation-circle" size={14} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <FontAwesome name="times" size={24} color="#2c3e50" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{label || 'اختر'}</Text>
            </View>

            <ScrollView style={styles.itemsList}>
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.item,
                    value === item.value && styles.itemSelected,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[
                    styles.itemText,
                    value === item.value && styles.itemTextSelected,
                  ]}>
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <FontAwesome name="check" size={18} color="#27ae60" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'right',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    minHeight: 50,
  },
  pickerButtonError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fef2f2',
  },
  icon: {
    marginLeft: 8,
  },
  pickerText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'right',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  chevron: {
    marginRight: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  closeButton: {
    padding: 4,
  },
  itemsList: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  itemSelected: {
    backgroundColor: '#f0fdf4',
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'right',
    flex: 1,
  },
  itemTextSelected: {
    color: '#27ae60',
    fontWeight: '600',
  },
});
