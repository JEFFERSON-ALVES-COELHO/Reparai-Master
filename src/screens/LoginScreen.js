import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Input } from '../components/ui';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function LoginScreen({ navigation }) {
    const { login } = useApp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true);
        try { await login(email.trim(), password); } catch (e) { Alert.alert('Ops', e.message); }
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
                <Image source={require('../../assets/Reparai.logo.jpg')} style={s.logo} resizeMode="contain" />
                <Text style={s.title}>Transforme sua cidade reportando problemas</Text>
                <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="voce@email.com" />
                <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="••••••" />
                <Button title="Entrar" onPress={submit} loading={loading} />
                <Button title="Criar conta" variant="outline" onPress={() => navigation.navigate('Register')} style={{ marginTop: 12 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const s = StyleSheet.create({
    container: { padding: 24, paddingTop: 60 },
    logo: { width: 180, height: 180, alignSelf: 'center' },
    title: { fontSize: 18, fontWeight: '700', color: colors.primary, textAlign: 'center', marginBottom: 24 },
});
