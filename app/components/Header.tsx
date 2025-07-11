import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { globalStyles, spacings } from '@utils/globalStyles';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const { colors } = useTheme();

    return (
        <View style={[
            styles.header, 
            spacings.pv3, 
            spacings.mt10, 
            globalStyles.row,
            { backgroundColor: colors.background }
            ]}
        >
            <Text style={[globalStyles.textBold, styles.title, { color: colors.text }]}>
                {title}
            </Text>
            <LanguageToggle />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: { fontSize: 24 },
});

export default Header;