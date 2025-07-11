import { TextStyle, ViewStyle, StyleSheet } from 'react-native';

export const globalTextStyles: TextStyle = {
    fontFamily: 'System',
    fontSize: 14,
    color: '#0C0C0C',
};

export const globalStyles = {
    text: globalTextStyles,
    textMedium: {
        ...globalTextStyles,
        fontWeight: '500' as const,
    },
    textBold: {
        ...globalTextStyles,
        fontWeight: '700' as const,
    },
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    } as ViewStyle,
    row: {
        flexDirection: 'row'
    } as ViewStyle,
};

const generateSpacings = (prefix: string, property: string, count: number = 50) => {
    const spaces: { [key: string]: any } = {};
    for (let i = 1; i <= count; i++) {
        spaces[`${prefix}${i}`] = { [property]: i * 4 };
    }
    return spaces;
};

export const spacings = StyleSheet.create({
    ...generateSpacings('m', 'margin'),
    ...generateSpacings('mt', 'marginTop'),
    ...generateSpacings('mb', 'marginBottom'),
    ...generateSpacings('ml', 'marginLeft'),
    ...generateSpacings('mr', 'marginRight'),
    ...generateSpacings('mv', 'marginVertical'),
    ...generateSpacings('mh', 'marginHorizontal'),
    ...generateSpacings('p', 'padding'),
    ...generateSpacings('pt', 'paddingTop'),
    ...generateSpacings('pb', 'paddingBottom'),
    ...generateSpacings('pv', 'paddingVertical'),
    ...generateSpacings('ph', 'paddingHorizontal'),
});

export const shadow = StyleSheet.create({
    boxShadow: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    boxShadowTop: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    textBlur: { opacity: 0.75 }
});