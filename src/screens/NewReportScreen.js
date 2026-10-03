import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../components/ui';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function NewReportScreen({ navigation }) {
    const { addReport } = useApp();
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [coords, setCoords] = useState(null);
    const [address, setAddress] = useState('');
    const [locating, setLocating] = useState(false);

    const takePhoto = async () => {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) return Alert.alert('Permissão necessária', 'Autorize a câmera para tirar a foto.');
        const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
        if (!res.canceled) setPhoto(res.assets[0].uri);
    };

    const pickPhoto = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
        if (!res.canceled) setPhoto(res.assets[0].uri);
    };

    const getLocation = async () => {
        setLocating(true);
        try {
            const perm = await Location.requestForegroundPermissionsAsync();
            if (!perm.granted) return Alert.alert('Permissão necessária', 'Autorize a localização ou digite o endereço.');
            const pos = await Location.getCurrentPositionAsync({});
            setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
            const [place] = await Location.reverseGeocodeAsync(pos.coords);
            if (place) setAddress([place.street, place.streetNumber, place.district, place.city].filter(Boolean).join(', '));
        } catch {
            Alert.alert('Ops', 'Não foi possível obter a localização.');
        } finally {
            setLocating(false);
        }
    };

    const submit = () => {
        if (!category) return Alert.alert('Atenção', 'Escolha o tipo de problema.');
        if (!address.trim() && !coords) return Alert.alert('Atenção', 'Informe a localização.');
        const report = addReport({ category, description: description.trim(), photo, coords, address: address.trim() });
        setCategory(null); setDescription(''); setPhoto(null); setCoords(null); setAddress('');
        Alert.alert('Enviado!', 'Sua ocorrência foi registrada.');
        navigation.navigate('ReportDetail', { id: report.id });
    };

    return (
        <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
            <Text style={s.section}>Tipo de problema</Text>
            <View style={s.chips}>
                {CATEGORIES.map((c) => {
                    const on = category === c.id;
                    return (
                        <Pressable key={c.id} onPress={() => setCategory(c.id)} style={[s.chip, on && s.chipOn]}>
                            <Ionicons name={c.icon} size={18} color={on ? '#fff' : colors.primary} />
                            <Text style={[s.chipText, on && { color: '#fff' }]}>{c.label}</Text>
                        </Pressable>
                    );
                })}
            </View>

            <Text style={s.section}>Foto</Text>
            {photo ? <Image source={{ uri: photo }} style={s.photo} /> : null}
            <View style={s.row}>
                <Button title="Câmera" onPress={takePhoto} variant="outline" style={{ flex: 1 }} />
                <Button title="Galeria" onPress={pickPhoto} variant="outline" style={{ flex: 1 }} />
            </View>

            <Text style={s.section}>Localização</Text>
            <Input value={address} onChangeText={setAddress} placeholder="Rua, número, bairro" />
            <Button title="Usar minha localização atual" onPress={getLocation} loading={locating} variant="outline" />

            <Text style={s.section}>Descrição</Text>
            <Input value={description} onChangeText={setDescription} placeholder="Descreva o problema (opcional)" multiline style={{ minHeight: 90, textAlignVertical: 'top' }} />

            <Button title="Enviar ocorrência" onPress={submit} style={{ marginTop: 8, marginBottom: 32 }} />
        </ScrollView>
    );
}

const s = StyleSheet.create({
    section: { fontSize: 16, fontWeight: '700', color: colors.primary, marginTop: 8, marginBottom: 10 },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.card },
    chipOn: { backgroundColor: colors.primary },
    chipText: { color: colors.primary, fontWeight: '600' },
    photo: { width: '100%', height: 200, borderRadius: 12, marginBottom: 10 },
    row: { flexDirection: 'row', gap: 10, marginBottom: 6 },
});
