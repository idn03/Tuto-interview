import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '@contexts/LanguageContext';
import { useTheme } from '@contexts/ThemeContext';
import { globalStyles } from '@utils/globalStyles';

const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { colors } = useTheme();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'vi' : 'en');
    };

    return (
        <TouchableOpacity
            style={[
                styles.toggle,
                { backgroundColor: colors.primary }
            ]}
            onPress={toggleLanguage}
        >
            <Text style={[globalStyles.textMedium, styles.languageText, { color: colors.background }]}>
                {language.toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggle: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        minWidth: 40,
        alignItems: 'center',
    },
    languageText: {
        fontSize: 12,
        fontWeight: '600',
    },
});

export default LanguageToggle;
