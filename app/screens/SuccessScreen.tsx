import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useLanguage } from '@contexts/LanguageContext';
import { useTheme } from '@contexts/ThemeContext';
import { globalStyles, spacings, shadow } from '@utils/globalStyles';

interface BookingData {
    teacherId: string;
    studentName: string;
    age: string;
    trialDate: Date;
    learningDays: string;
    bookingDate: Date;
}

interface Teacher {
    id: string;
    name: {
        en: string;
        vi: string;
    };
    subject: {
        en: string;
        vi: string;
    };
    fee: {
        amount: number;
        currency: string;
    };
}

interface RouteParams {
    bookingData: BookingData;
    teacher: Teacher;
}

const SuccessScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { language, dictionary } = useLanguage();
    const { colors } = useTheme();
    
    const { bookingData, teacher } = route.params as RouteParams;
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatFee = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const handleGoHome = () => {
        navigation.navigate('TeacherDiscovery' as never);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
                <View style={styles.successIcon}>
                    <AntDesign name="check" size={40} color={colors.background} />
                </View>
                <Text style={[globalStyles.textBold, styles.successTitle, { color: colors.background }]}>
                    {dictionary.success}
                </Text>
                <Text style={[globalStyles.text, styles.successSubtitle, { color: colors.background + 'CC' }]}>
                    Your booking has been confirmed!
                </Text>
            </View>

            <ScrollView style={[styles.content, spacings.mt5]} showsVerticalScrollIndicator={false}>
                {/* Invoice Card */}
                <View style={[styles.invoiceCard, shadow.boxShadow, { backgroundColor: colors.background }]}>
                    <Text style={[globalStyles.textBold, styles.invoiceTitle, { color: colors.text }]}>
                        📋 Booking Invoice
                    </Text>

                    {/* Teacher Information */}
                    <View style={[styles.section, { borderBottomColor: colors.border }]}>
                        <Text style={[globalStyles.textBold, styles.sectionTitle, { color: colors.primary }]}>
                            👨‍🏫 Teacher Information
                        </Text>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Name:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {teacher.name[language]}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Subject:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {teacher.subject[language]}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Fee:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.primary }]}>
                                {formatFee(teacher.fee.amount)} {teacher.fee.currency}/hour
                            </Text>
                        </View>
                    </View>

                    {/* Student Information */}
                    <View style={[styles.section, { borderBottomColor: colors.border }]}>
                        <Text style={[globalStyles.textBold, styles.sectionTitle, { color: colors.primary }]}>
                            👨‍🎓 Student Information
                        </Text>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Name:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {bookingData.studentName}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Age:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {bookingData.age} years old
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Learning Days:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {bookingData.learningDays}
                            </Text>
                        </View>
                    </View>

                    {/* Booking Details */}
                    <View style={[styles.section, { borderBottomColor: colors.border }]}>
                        <Text style={[globalStyles.textBold, styles.sectionTitle, { color: colors.primary }]}>
                            📅 Booking Details
                        </Text>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Trial Date:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {formatDate(bookingData.trialDate)}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Booking Date:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {formatDate(bookingData.bookingDate)}
                            </Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={[globalStyles.text, styles.label, { color: colors.textLight }]}>
                                Booking Time:
                            </Text>
                            <Text style={[globalStyles.textBold, styles.value, { color: colors.text }]}>
                                {formatTime(bookingData.bookingDate)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.homeButton, { backgroundColor: colors.primary }]}
                        onPress={handleGoHome}
                    >
                        <AntDesign name="home" size={20} color={colors.background} />
                        <Text style={[globalStyles.textBold, styles.buttonText, { color: colors.background }]}>
                            Back to Home
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    successTitle: {
        fontSize: 24,
        marginBottom: 8,
    },
    successSubtitle: {
        fontSize: 16,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    invoiceCard: {
        marginTop: -20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    invoiceTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        flex: 1,
    },
    value: {
        fontSize: 14,
        flex: 2,
        textAlign: 'right',
    },
    bookingIdContainer: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookingId: {
        fontSize: 16,
        letterSpacing: 1,
    },
    actions: {
        paddingBottom: 20,
    },
    homeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default SuccessScreen;