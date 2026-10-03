export const CATEGORIAS = [
    { id: 'buraco', label: 'Buraco na via', icon: 'warning-outline' },
    { id: 'iluminacao', label: 'Iluminação', icon: 'bulb-outline' },
    { id: 'lixo', label: 'Lixo irregular', icon: 'trash-outline' },
    { id: 'mato', label: 'Mato alto', icon: 'leaf-outline' },
    { id: 'outros', label: 'Outros', icon: 'ellipsis-horizontal-circle-outline' },
];

export const categoryById = (id) => CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[4];