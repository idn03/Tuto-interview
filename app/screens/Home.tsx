import React, { useState, useMemo } from 'react';
import { useLanguage } from '@contexts/LanguageContext';

import { View, FlatList, StyleSheet } from 'react-native';
import { Header } from '@components/index';
import Filter from '@components/Filter';

import { globalStyles } from '@utils/globalStyles';
import { spacings } from '@utils/globalStyles';
import { subjects, mockTeachers } from '@mock/mockTeachers';

const HomeScreen = () => {
    const { dictionary } = useLanguage();
    const [selectedSubject, setSelectedSubject] = useState('all');

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

    return (
        <View style={[globalStyles.container, spacings.p4]}>
            <Header title={dictionary.title} />

            <View style={[styles.content, spacings.mt4, spacings.ph2]}>
                <Filter 
                    selectedSubject={selectedSubject}
                    onSubjectChange={handleSubjectChange}
                />

                {/* Teacher Card List */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: { flex: 1 },
});

export default HomeScreen;