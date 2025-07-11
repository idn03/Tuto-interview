import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useLanguage } from '@contexts/LanguageContext';
import { useTheme } from '@contexts/ThemeContext';
import { globalStyles, spacings, shadow } from '@utils/globalStyles';
import { Teacher } from '@mock/mockTeachers';
import { AntDesign } from '@expo/vector-icons';

interface BookingData {
    teacherId: string;
    studentName: string;
    age: string;
    trialDate: Date;
    learningDays: string;
    bookingDate: Date;
}

interface TeacherCardProps {
    teacher: Teacher;
    onBookNow: (teacherId: string) => void;
    index: number;
    bookingData?: BookingData | null;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onBookNow, index, bookingData }) => {
    const { language, dictionary } = useLanguage();
    const { colors } = useTheme();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const buttonScaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const delay = index * 150; // Stagger animation for each card

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const formatFee = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <AntDesign key={`full-${i}`} name="star" size={16} color="#FFD700" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <AntDesign key="half" name="star" size={16} color="#FFD700" />
            );
        }

        // Empty stars
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <AntDesign key={`empty-${i}`} name="staro" size={16} color="#D3D3D3" />
            );
        }

        return stars;
    };

    const handleBookNow = (teacherId: string) => {
        // Button press animation
        Animated.sequence([
            Animated.timing(buttonScaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        onBookNow(teacherId);
    };

    return (
        <Animated.View
            style={[
                spacings.mb4,
                spacings.p2,
                {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    opacity: fadeAnim,
                    transform: [
                        { translateY: slideAnim },
                        { scale: scaleAnim }
                    ]
                },
                shadow.boxShadow
            ]}
        >
            <Image source={teacher.image} style={styles.profileImage} />

            <View style={[styles.header, spacings.p2]}>
                <View style={{ flex: 1 }}>
                    <Text style={[globalStyles.textBold, spacings.mb1, styles.name, { color: colors.text }]}>
                        {teacher.name[language]}
                    </Text>
                    <Text style={[globalStyles.textMedium, spacings.mb2, styles.subject, { color: colors.primary }]}>
                        {teacher.subject[language]}
                    </Text>
                    <View style={styles.ratingContainer}>
                        {renderStars(teacher.rating)}
                        <Text style={[globalStyles.text, spacings.ml2, { color: colors.textLight }]}>
                            {teacher.rating.toFixed(1)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={spacings.ph4}>
                {/* Location */}
                <View style={[globalStyles.row, spacings.mt2]}>
                    <AntDesign name="enviromento" size={16} color={colors.textLight} />
                    <Text style={[globalStyles.text, spacings.ml2, { color: colors.textLight }]}>
                        {teacher.location[language]}
                    </Text>
                </View>

                {/* Experience */}
                <View style={[globalStyles.row, spacings.mt2]}>
                    <AntDesign name="clockcircleo" size={16} color={colors.textLight} />
                    <Text style={[globalStyles.text, spacings.ml2, { color: colors.textLight }]}>
                        {teacher.experience[language]}
                    </Text>
                </View>

                {/* Description */}
                <Text style={[globalStyles.text, spacings.mt2, styles.description, { color: colors.textLight }]}>
                    {teacher.description[language]}
                </Text>

                {/* Footer with Fee and Book Button or Booking Info */}
                <View style={[styles.footer, spacings.mt2, spacings.pt3]}>
                    {bookingData ? (
                        // Show booking information
                        <View style={{ flex: 1 }}>
                            <View style={[styles.bookingInfo, spacings.ph3]}>
                                <Text style={[globalStyles.textBold, styles.bookingTitle, spacings.mb1, { color: colors.primary }]}>
                                    {dictionary.booked}
                                </Text>
                                <Text style={[globalStyles.text, styles.bookingText, spacings.mb1, { color: colors.text }]}>
                                    {dictionary.student}: {bookingData.studentName} ({bookingData.age} {dictionary.yearsOld})
                                </Text>
                                <Text style={[globalStyles.text, styles.bookingText, spacings.mb1, { color: colors.textLight }]}>
                                    {dictionary.trial}: {new Date(bookingData.trialDate).toLocaleDateString()}
                                </Text>
                                <Text style={[globalStyles.text, styles.bookingText, spacings.mb1, { color: colors.textLight }]}>
                                    {dictionary.days}: {bookingData.learningDays}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        // Show fee and book button
                        <>
                            <View style={{ flex: 1 }}>
                                <Text style={[globalStyles.textBold, styles.fee, { color: colors.primary }]}>
                                    {formatFee(teacher.fee.amount)} {teacher.fee.currency}
                                </Text>
                                <Text style={[globalStyles.text, styles.period, { color: colors.textLight }]}>
                                    {teacher.fee.period[language]}
                                </Text>
                            </View>

                            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
                                <TouchableOpacity
                                    style={[styles.bookButton, spacings.ph8, spacings.pv3, { backgroundColor: colors.secondary }]}
                                    onPress={() => handleBookNow(teacher.id)}
                                >
                                    <Text style={[globalStyles.textBold, { color: colors.background }]}>
                                        {dictionary.bookNow}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </>
                    )}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    profileImage: {
        width: '100%',
        height: 160,
        borderRadius: 20,
    },
    name: {
        fontSize: 20,
        textAlign: 'center'
    },
    subject: {
        textAlign: 'center'
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        lineHeight: 20,
        textAlign: 'justify'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    fee: {
        fontSize: 18,
    },
    period: {
        fontSize: 12,
        marginTop: 2,
    },
    bookButton: {
        borderRadius: 20,
        minWidth: 100,
        alignItems: 'center',
    },
    bookingInfo: {
        borderRadius: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#555879',
    },
    bookingTitle: {
        fontSize: 16,
    },
    bookingText: {
        fontSize: 12,
    },
});

export default TeacherCard;
