import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';

export default function DatePicker({
  label,
  value,
  onValueChange,
  error,
  icon,
  placeholder = 'اختر التاريخ',
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());

  const formatDate = (date) => {
    if (!date) return placeholder;
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirm = () => {
    onValueChange(selectedDate.toISOString());
    setModalVisible(false);
  };

  const changeYear = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setSelectedDate(newDate);
  };

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const changeDay = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + increment);
    setSelectedDate(newDate);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.dateButton,
          error && styles.dateButtonError,
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
          styles.dateText,
          !value && styles.placeholderText,
        ]}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <FontAwesome
          name="calendar"
          size={16}
          color="#94A3B8"
          style={styles.calendarIcon}
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
              <Text style={styles.modalTitle}>{label || 'اختر التاريخ'}</Text>
            </View>

            <View style={styles.datePickerContainer}>
              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.columnLabel}>السنة</Text>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => changeYear(1)}
                >
                  <FontAwesome name="chevron-up" size={20} color="#27ae60" />
                </TouchableOpacity>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>{selectedDate.getFullYear()}</Text>
                </View>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => changeYear(-1)}
                >
                  <FontAwesome name="chevron-down" size={20} color="#27ae60" />
                </TouchableOpacity>
              </View>

              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.columnLabel}>الشهر</Text>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => changeMonth(1)}
                >
                  <FontAwesome name="chevron-up" size={20} color="#27ae60" />
                </TouchableOpacity>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>
                    {(selectedDate.getMonth() + 1).toString().padStart(2, '0')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => changeMonth(-1)}
                >
                  <FontAwesome name="chevron-down" size={20} color="#27ae60" />
                </TouchableOpacity>
              </View>

              {/* Day Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.columnLabel}>اليوم</Text>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => changeDay(1)}
                >
                  <FontAwesome name="chevron-up" size={20} color="#27ae60" />
                </TouchableOpacity>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>
                    {selectedDate.getDate().toString().padStart(2, '0')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => changeDay(-1)}
                >
                  <FontAwesome name="chevron-down" size={20} color="#27ae60" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.selectedDateDisplay}>
              <Text style={styles.selectedDateText}>
                التاريخ المختار: {formatDate(selectedDate)}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <CustomButton
                title="تأكيد"
                onPress={handleConfirm}
                icon="check"
              />
            </View>
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    minHeight: 50,
  },
  dateButtonError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fef2f2',
  },
  icon: {
    marginLeft: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'right',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  calendarIcon: {
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
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  pickerColumn: {
    alignItems: 'center',
    gap: 12,
  },
  columnLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  arrowButton: {
    padding: 8,
  },
  valueContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#27ae60',
  },
  valueText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#27ae60',
  },
  selectedDateDisplay: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8fafc',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalButtons: {
    paddingHorizontal: 20,
  },
});
