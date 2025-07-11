import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLanguage } from '@contexts/LanguageContext';
import { useTheme } from '@contexts/ThemeContext';

import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { globalStyles, spacings } from '@utils/globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Teacher } from '@mock/mockTeachers';
import { RootStackParamList } from '@app/Router';

interface BookingData {
    teacherId: string;
    studentName: string;
    age: string;
    trialDate: Date;
    learningDays: string;
    bookingDate: Date;
}

interface BookingModalProps {
    visible: boolean;
    teacher: Teacher | null;
    onClose: () => void;
    onBookingSuccess: (teacherId: string, bookingData: BookingData) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
    visible,
    teacher,
    onClose,
    onBookingSuccess,
}) => {
    const { language, dictionary } = useLanguage();
    const { colors } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [formData, setFormData] = useState({
        studentName: '',
        age: '',
        trialDate: new Date(),
        learningDays: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);

    useEffect(() => {
        if (visible) {
            setFormData({
                studentName: '',
                age: '',
                trialDate: new Date(),
                learningDays: '',
            });
        }
    }, [visible]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        } else {
            setShowIOSDatePicker(false);
        }
        if (selectedDate) {
            setFormData(prev => ({ ...prev, trialDate: selectedDate }));
        }
    };

    const validateForm = () => {
        if (!formData.studentName.trim()) {
            Alert.alert('Error', 'Please enter student name');
            return false;
        }
        if (!formData.age.trim() || isNaN(Number(formData.age))) {
            Alert.alert('Error', 'Please enter a valid age');
            return false;
        }
        if (!formData.learningDays.trim()) {
            Alert.alert('Error', 'Please enter learning days');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm() || !teacher) return;

        setIsSubmitting(true);

        try {
            const bookingData: BookingData = {
                teacherId: teacher.id,
                studentName: formData.studentName.trim(),
                age: formData.age.trim(),
                trialDate: formData.trialDate,
                learningDays: formData.learningDays.trim(),
                bookingDate: new Date(),
            };

            const existingBookings = await AsyncStorage.getItem('teacherBookings');
            const bookings = existingBookings ? JSON.parse(existingBookings) : {};
            bookings[teacher.id] = bookingData;
            await AsyncStorage.setItem('teacherBookings', JSON.stringify(bookings));

            console.log('Booking submitted:', bookingData);

            onBookingSuccess(teacher.id, bookingData);

            navigation.navigate('Success', {
                bookingData,
                teacher: {
                    id: teacher.id,
                    name: teacher.name,
                    subject: teacher.subject,
                    fee: teacher.fee,
                }
            });

        } catch (error) {
            console.error('Booking error:', error);
            Alert.alert('Error', 'Failed to save booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US');
    };

    if (!teacher) return null;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.modalOverlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    {/* Header */}
                    <View style={[styles.modalHeader, spacings.ph5, spacings.pv4]}>
                        <Text style={[globalStyles.textBold, styles.modalTitle, { color: colors.text }]}>
                            {dictionary.bookNow}
                        </Text>
                        <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
                            <AntDesign name="close" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={[spacings.ph5, spacings.pv4]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        {/* Teacher Info */}
                        <View style={[styles.teacherInfo, spacings.mb5, { backgroundColor: colors.primary + '10' }]}>
                            <Text style={[globalStyles.textBold, { color: colors.primary }]}>
                                {teacher.name[language]}
                            </Text>
                            <Text style={[globalStyles.text, { color: colors.textLight }]}>
                                {teacher.subject[language]}
                            </Text>
                        </View>

                        {/* Student Name */}
                        <View style={spacings.mb5}>
                            <Text style={[globalStyles.textMedium, styles.label, spacings.mb2, { color: colors.text }]}>
                                {dictionary.studentName}
                            </Text>
                            <TextInput
                                style={[styles.textInput, spacings.ph4, spacings.pv3, {
                                    borderColor: colors.border,
                                    color: colors.text,
                                    backgroundColor: colors.background
                                }]}
                                value={formData.studentName}
                                onChangeText={(value) => handleInputChange('studentName', value)}
                                placeholder="Enter student name"
                                placeholderTextColor={colors.textLight}
                                returnKeyType="next"
                            />
                        </View>

                        {/* Age */}
                        <View style={spacings.mb5}>
                            <Text style={[globalStyles.textMedium, styles.label, spacings.mb2, { color: colors.text }]}>
                                {dictionary.age}
                            </Text>
                            <TextInput
                                style={[styles.textInput, spacings.ph4, spacings.pv3, {
                                    borderColor: colors.border,
                                    color: colors.text,
                                    backgroundColor: colors.background
                                }]}
                                value={formData.age}
                                onChangeText={(value) => handleInputChange('age', value)}
                                placeholder="Enter age"
                                placeholderTextColor={colors.textLight}
                                keyboardType="numeric"
                                returnKeyType="next"
                            />
                        </View>

                        {/* Trial Date */}
                        <View style={spacings.mb5}>
                            <Text style={[globalStyles.textMedium, styles.label, spacings.mb2, { color: colors.text }]}>
                                {dictionary.trialDate}
                            </Text>
                            <TouchableOpacity
                                style={[styles.dateButton, spacings.ph4, spacings.pv3, {
                                    borderColor: colors.border,
                                    backgroundColor: colors.background
                                }]}
                                onPress={() => {
                                    if (Platform.OS === 'ios') {
                                        setShowIOSDatePicker(true);
                                    } else {
                                        setShowDatePicker(true);
                                    }
                                }}
                                activeOpacity={0.7}
                            >
                                <Text style={[globalStyles.text, spacings.mr2, { color: colors.text, flex: 1 }]}>
                                    {formatDate(formData.trialDate)}
                                </Text>
                                <AntDesign name="calendar" size={20} color={colors.textLight} />
                            </TouchableOpacity>
                        </View>

                        {/* Learning Days */}
                        <View style={spacings.mb5}>
                            <Text style={[globalStyles.textMedium, styles.label, spacings.mb2, { color: colors.text }]}>
                                {dictionary.learningDays}
                            </Text>
                            <TextInput
                                style={[styles.textInput, spacings.ph4, spacings.pv3, {
                                    borderColor: colors.border,
                                    color: colors.text,
                                    backgroundColor: colors.background
                                }]}
                                value={formData.learningDays}
                                onChangeText={(value) => handleInputChange('learningDays', value)}
                                placeholder="e.g., Monday, Wednesday, Friday"
                                placeholderTextColor={colors.textLight}
                                multiline
                                returnKeyType="done"
                            />
                        </View>
                    </ScrollView>

                    <View style={[styles.footer, spacings.ph5, spacings.pv4]}>
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                spacings.pv4,
                                { backgroundColor: colors.primary },
                                isSubmitting && { opacity: 0.6 }
                            ]}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        >
                            <Text style={[globalStyles.textBold, styles.submitButtonText, { color: colors.background }]}>
                                {isSubmitting ? 'Submitting...' : dictionary.submit}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Date Picker */}
                {showDatePicker && Platform.OS === 'android' && (
                    <DateTimePicker
                        value={formData.trialDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        minimumDate={new Date()}
                        maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                    />
                )}
            </KeyboardAvoidingView>

            {/* iOS Date Picker Modal */}
            {showIOSDatePicker && Platform.OS === 'ios' && (
                <Modal
                    visible={showIOSDatePicker}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.iosDatePickerOverlay}>
                        <View style={[styles.iosDatePickerContent, spacings.pb5, { backgroundColor: colors.background }]}>
                            <View style={[styles.iosDatePickerHeader, spacings.ph5, spacings.pv4]}>
                                <TouchableOpacity onPress={() => setShowIOSDatePicker(false)}>
                                    <Text style={[globalStyles.text, { color: colors.primary }]}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={[globalStyles.textBold, { color: colors.text }]}>Select Date</Text>
                                <TouchableOpacity onPress={() => setShowIOSDatePicker(false)}>
                                    <Text style={[globalStyles.text, { color: colors.primary }]}>Done</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={formData.trialDate}
                                mode="date"
                                display="spinner"
                                onChange={handleDateChange}
                                minimumDate={new Date()}
                                maximumDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
        fontSize: 20,
    },
    teacherInfo: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    submitButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 16,
    },
    iosDatePickerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    iosDatePickerContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    iosDatePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
});

export default BookingModal;
