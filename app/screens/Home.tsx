import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@contexts/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, FlatList, StyleSheet, Animated, Alert } from 'react-native';
import { Header } from '@components/index';
import Filter from '@components/Filter';
import TeacherCard from '@components/TeacherCard';
import BookingModal from '@components/BookingModal';

import { globalStyles } from '@utils/globalStyles';
import { spacings } from '@utils/globalStyles';
import { subjects, mockTeachers, Teacher } from '@mock/mockTeachers';

interface BookingData {
    teacherId: string;
    studentName: string;
    age: string;
    trialDate: Date;
    learningDays: string;
    bookingDate: Date;
}

const HomeScreen = () => {
    const { dictionary, language } = useLanguage();
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [bookings, setBookings] = useState<{ [key: string]: BookingData }>({});

    const filteredTeachers = useMemo(() => {
        if (selectedSubject === 'all') {
            return mockTeachers;
        }
        return mockTeachers.filter(teacher => {
            const subjectValue = subjects.find(s => s.label.en === teacher.subject.en)?.value;
            return subjectValue === selectedSubject;
        });
    }, [selectedSubject]);

    const handleSubjectChange = (subject: string) => {
        setSelectedSubject(subject);
    };
    
    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const storedBookings = await AsyncStorage.getItem('teacherBookings');
            if (storedBookings) {
                setBookings(JSON.parse(storedBookings));
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    };

    const handleBookNow = (teacherId: string) => {
        const teacher = mockTeachers.find(t => t.id === teacherId);
        if (teacher) {
            setSelectedTeacher(teacher);
            setModalVisible(true);
        }
    };

    const handleBookingSuccess = (teacherId: string, bookingData: BookingData) => {
        setBookings(prev => ({
            ...prev,
            [teacherId]: bookingData
        }));
        setModalVisible(false);
        setSelectedTeacher(null);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedTeacher(null);
    };

    const renderTeacherCard = ({ item, index }: { item: Teacher; index: number }) => (
        <TeacherCard 
            teacher={item} 
            onBookNow={handleBookNow}
            index={index}
            bookingData={bookings[item.id]}
        />
    );

    return (
        <View style={[globalStyles.container, spacings.p4]}>
            <Header title={dictionary.title} />

            <View style={[styles.content, spacings.mt4, spacings.ph4]}>
                <Filter 
                    selectedSubject={selectedSubject}
                    onSubjectChange={handleSubjectChange}
                />

                <FlatList
                    data={filteredTeachers}
                    renderItem={renderTeacherCard}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={spacings.pb5}
                    style={{borderRadius: 10}}
                />

                <BookingModal
                    visible={modalVisible}
                    teacher={selectedTeacher}
                    onClose={handleCloseModal}
                    onBookingSuccess={handleBookingSuccess}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1 },
});

export default HomeScreen;