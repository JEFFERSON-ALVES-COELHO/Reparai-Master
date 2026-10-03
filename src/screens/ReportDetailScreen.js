import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBadge } from '../components/ui';
import { categoryById } from '../data/categories';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

const STEPS = ['Enviado', 'Em análise', 'Em andamento', 'Resolvido'];

export default function ReportDetailScreen({ route }) {
    const { reports } = useApp();
    const report = reports.find((r) => r.id === route.params.id);
    if (!report) return <Text style={{ padding: 20 }}>Ocorrência não encontrada.</Text>;
    const cat = categoryById(report.category);
    const current = STEPS.indexOf(report.status);

    return (
        <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
            {report.photo ? <Image source={{ uri: report.photo }} style={s.photo} /> : null}
            <Text style={s.title}>{cat.label}</Text>
            <StatusBadge status={report.status} />
            <Text style={s.label}>Local</Text>
            <Text style={s.text}>{report.address || 'Coordenadas registradas'}</Text>
            <Text style={s.label}>Descrição</Text>
            <Text style={s.text}>{report.description || 'Sem descrição.'}</Text>
            <Text style={s.label}>Enviado em</Text>
            <Text style={s.text}>{new Date(report.createdAt).toLocaleString('pt-BR')}</Text>

            <Text style={s.label}>Acompanhamento</Text>
            {STEPS.map((step, i) => (
                <View key={step} style={s.step}>
                    <View style={[s.dot, i <= current && { backgroundColor: colors.green }]} />
                    <Text style={[s.text, i > current && { color: colors.muted }]}>{step}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    photo: { width: '100%', height: 220, borderRadius: 14, marginBottom: 14 },
    title: { fontSize: 24, fontWeight: '800', color: colors.primary, marginBottom: 8 },
    label: { fontSize: 13, fontWeight: '700', color: colors.muted, marginTop: 16, marginBottom: 4, textTransform: 'uppercase' },
    text: { fontSize: 16, color: colors.text },
    step: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
    dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.border },
});
