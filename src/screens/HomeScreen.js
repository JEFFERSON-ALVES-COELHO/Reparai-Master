import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge } from '../components/ui';
import { categoryById } from '../data/categories';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
    const { reports, user } = useApp();

    return (
        <FlatList
            style={{ backgroundColor: colors.bg }}
            contentContainerStyle={{ padding: 16 }}
            data={reports}
            keyExtractor={(r) => r.id}
            ListHeaderComponent={<Text style={s.hello}>Olá, {user?.name}! 👋{'\n'}<Text style={s.sub}>Acompanhe os problemas reportados:</Text></Text>}
            ListEmptyComponent={<Text style={s.sub}>Nenhuma ocorrência ainda.</Text>}
            renderItem={({ item }) => {
                const cat = categoryById(item.category);
                return (
                    <Pressable style={s.card} onPress={() => navigation.navigate('ReportDetail', { id: item.id })}>
                        <View style={s.iconBox}><Ionicons name={cat.icon} size={26} color={colors.accent} /></View>
                        <View style={{ flex: 1 }}>
                            <Text style={s.cardTitle}>{cat.label}</Text>
                            <Text style={s.addr} numberOfLines={1}>{item.address || 'Sem endereço'}</Text>
                            <StatusBadge status={item.status} />
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                    </Pressable>
                );
            }}
        />
    );
}

const s = StyleSheet.create({
    hello: { fontSize: 22, fontWeight: '800', color: colors.primary, marginBottom: 16 },
    sub: { fontSize: 14, fontWeight: '400', color: colors.muted },
    card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
    iconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: colors.accent + '1A', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
    addr: { color: colors.muted, marginVertical: 2 },
});
