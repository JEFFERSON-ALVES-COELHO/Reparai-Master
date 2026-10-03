import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, statusColors } from '../colors';

export function Button({ title, onPress, variant = 'primary', loading, style }) {
    const outline = variant === 'outline';
    return (
        <Pressable
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => [s.btn, outline && s.btnOutline, pressed && { opacity: 0.85 }, style]}
        >
            {loading ? (
                <ActivityIndicator color={outline ? colors.primary : '#fff'} />
            ) : (
                <Text style={[s.btnText, outline && { color: colors.primary }]}>{title}</Text>
            )}
        </Pressable>
    );
}

export function Input({ label, ...props }) {
    return (
        <View style={{ marginBottom: 14 }}>
            {label ? <Text style={s.label}>{label}</Text> : null}
            <TextInput placeholderTextColor={colors.muted} style={s.input} {...props} />
        </View>
    );
}

export function StatusBadge({ status }) {
    const c = statusColors[status] || colors.muted;
    return (
        <View style={[s.badge, { backgroundColor: c + '22' }]}>
            <Text style={[s.badgeText, { color: c }]}>{status}</Text>
        </View>
    );
}

const s = StyleSheet.create({
    btn: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 2, borderColor: colors.primary },
    btnOutline: { backgroundColor: 'transparent' },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    label: { color: colors.text, fontWeight: '600', marginBottom: 6 },
    input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, fontSize: 16, color: colors.text },
    badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    badgeText: { fontSize: 12, fontWeight: '700' },
});
