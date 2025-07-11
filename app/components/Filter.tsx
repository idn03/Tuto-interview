import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLanguage } from '@contexts/LanguageContext';
import { useTheme } from '@contexts/ThemeContext';
import { globalStyles, shadow, spacings } from '@utils/globalStyles';
import { subjects } from '@mock/mockTeachers';

interface FilterProps {
    selectedSubject: string;
    onSubjectChange: (subject: string) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedSubject, onSubjectChange }) => {
    const { dictionary, language } = useLanguage();
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);

    const selectedSubjectLabel = subjects.find(s => s.value === selectedSubject)?.label[language] || subjects[0].label[language];

    const handleSubjectSelect = (subjectValue: string) => {
        onSubjectChange(subjectValue);
        setModalVisible(false);
    };

    const renderFilterModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <View style={[styles.modalHeader, spacings.ph5, spacings.pv4]}>
                        <Text style={[globalStyles.textBold, styles.modalTitle, { color: colors.text }]}>
                            {dictionary.filterBySubject}
                        </Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <AntDesign name="close" size={20} color={colors.text} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={subjects}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.option,
                                    spacings.ph5,
                                    spacings.pv4,
                                    selectedSubject === item.value && { backgroundColor: colors.primary + '20' }
                                ]}
                                onPress={() => handleSubjectSelect(item.value)}
                            >
                                <Text style={[
                                    globalStyles.text,
                                    { color: colors.text },
                                    selectedSubject === item.value && { color: colors.primary, fontWeight: '600' }
                                ]}>
                                    {item.label[language]}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={[spacings.mb4, { backgroundColor: colors.background }]}>
            <Text style={[globalStyles.textMedium, styles.label, spacings.mb2, { color: colors.text }]}>
                {dictionary.filterBySubject}
            </Text>

            <TouchableOpacity
                style={[styles.selector, spacings.ph4, spacings.pv3, shadow.boxShadow, { backgroundColor: '#FFF' }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={[globalStyles.text, { color: colors.text }]}>
                    {selectedSubjectLabel}
                </Text>
                <Entypo name="chevron-down" size={20} color={colors.text} />
            </TouchableOpacity>

            {renderFilterModal()}
        </View>
    );
};



const styles = StyleSheet.create({
    label: {
        fontSize: 16,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        height: 50,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
        fontSize: 18,
    },
    option: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
});

export default Filter; 