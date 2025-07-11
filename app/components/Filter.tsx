import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLanguage } from '@contexts/LanguageContext';
import { useTheme } from '@contexts/ThemeContext';
import { globalStyles, spacings } from '@utils/globalStyles';
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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[globalStyles.textMedium, styles.label, { color: colors.text }]}>
                {dictionary.filterBySubject}
            </Text>

            <TouchableOpacity
                style={[styles.selector, { borderColor: colors.border, backgroundColor: colors.background }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={[globalStyles.text, { color: colors.text }]}>
                    {selectedSubjectLabel}
                </Text>
                <Entypo name="chevron-down" size={20} color={colors.text} />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                        <View style={styles.modalHeader}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
        fontSize: 18,
    },
    option: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
});

export default Filter; 