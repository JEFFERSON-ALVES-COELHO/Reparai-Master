import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/ui';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function ProfileScreen() {
    const { user, reports, logout } = useApp();
    return (
        <View style={s.container}>
            <View style={s.avatar}><Text style={s.initial}>{user?.name?.[0]?.toUpperCase()}</Text></View>
            <Text style={s.name}>{user?.name}</Text>
            <Text style={s.email}>{user?.email}</Text>
            <Text style={s.count}>{reports.length} ocorrência(s) no app</Text>
            <Button title="Sair" variant="outline" onPress={logout} style={{ alignSelf: 'stretch', marginTop: 24 }} />
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', padding: 24, paddingTop: 48 },
    avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    initial: { color: '#fff', fontSize: 36, fontWeight: '800' },
    name: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 12 },
    email: { color: colors.muted, marginTop: 2 },
    count: { color: colors.primary, fontWeight: '600', marginTop: 16 },
});
