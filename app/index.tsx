import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

interface Task {
  id: string;
  title: string;
  deadline: string;
  checked: boolean;
  category: string;
}

const Index = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [list, setList] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const titleRef = useRef<TextInput>(null);
  const deadlineRef = useRef<TextInput>(null);

  const addTask = () => {
    if (title.trim().length < 3) {
      Alert.alert('Warning', 'Please enter a valid title (at least 3 characters).');
      return;
    }

    if (deadline.trim().length < 8) {
      Alert.alert('Warning', 'Please enter a valid deadline (at least 8 characters).');
      return;
    }

    if (category.trim() === '') {
      Alert.alert('Warning', 'Please select a category.');
      return;
    }

    // Show confirmation alert before adding task
    Alert.alert(
      'Ingin menambahkan jadwal ibadah?',
      'Apakah Anda yakin ingin menambahkan jadwal ibadah ini?',
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Iya',
          onPress: () => {
            const newTask = {
              id: Date.now().toString(),
              title: title.trim(),
              deadline: deadline.trim(),
              checked: false,
              category: category,
            };
            setList([...list, newTask]);
            setTitle('');
            setDeadline('');
            setCategory('');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(list));
      console.log('Berhasil simpan data');
    } catch (error) {
      console.log('Gagal simpan', error);
    }
  };

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('tasks');
      if (saved !== null) {
        setList(JSON.parse(saved));
        console.log('Berhasil load data');
      }
    } catch (error) {
      console.log('Gagal load', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [list]);

  const deleteTask = (id: string) => {
    Alert.alert(
      'Yakin Mau Hapus?',
      'Tugas ini akan dihapus secara permanen.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          onPress: () => {
            const filtered = list.filter(item => item.id !== id);
            setList(filtered);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = () => {
    const updated = list.map(item =>
      item.id === editId
        ? { ...item, title: title.trim(), deadline: deadline.trim(), category: category }
        : item
    );

    // Show confirmation alert before editing the task
    Alert.alert(
      'Ingin mengupdate jadwal ibadah?',
      'Apakah Anda yakin ingin mengupdate jadwal ibadah ini?',
      [
        { text: 'Tidak', style: 'cancel' },
        {
          text: 'Iya',
          onPress: () => {
            setList(updated);
            setTitle('');
            setDeadline('');
            setIsEditing(false);
            setEditId(null);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const startEdit = (item: any) => {
    setTitle(item.title);
    setDeadline(item.deadline);
    setIsEditing(true);
    setEditId(item.id);
  };

  const toggleCheck = (id: string) => {
    const updated = list.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setList(updated);
  };

  // Filter the list based on the selected category
  const filteredList = filterCategory
    ? list.filter(item => item.category === filterCategory)
    : list;

  return (
    <SafeAreaView style={tw`flex-1 bg-[#1D3A29]`}>
      <ScrollView style={tw`h-full`}>
        <View style={tw`mx-4 my-5`}>
          {/* Header Section */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-white text-3xl font-bold mb-2`}>Assalamu'alaikum!</Text>
            <Text style={tw`text-gray-300 text-lg`}>Track ibadah harian Anda</Text>
          </View>

          {/* Input Section with New Design */}
          <View style={tw`bg-[#1E2B29] p-4 rounded-xl mb-6 shadow-lg`}>
            <TextInput
              style={tw`bg-[#2D3B39] text-white p-4 rounded-xl mb-3`}
              placeholder="Nama Ibadah"
              placeholderTextColor={'#9CA3AF'}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
            />

            <TextInput
              style={tw`bg-[#2D3B39] text-white p-4 rounded-xl mb-3`}
              placeholder="Tanggal Ibadah"
              placeholderTextColor={'#9CA3AF'}
              value={deadline}
              onChangeText={setDeadline}
            />

            <View style={tw`bg-[#2D3B39] rounded-xl mb-4 overflow-hidden`}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={tw`text-white bg-transparent`}
                dropdownIconColor="#F4C542"
              >
                <Picker.Item label="Pilih Kategori" value="" />
                <Picker.Item label="Wajib" value="Wajib" />
                <Picker.Item label="Sunnah" value="Sunnah" />
              </Picker>
            </View>

            <TouchableOpacity
              style={tw`bg-[#F4C542] p-4 rounded-xl items-center ${
                title === '' && deadline === '' || category === '' ? 'opacity-50' : ''
              }`}
              onPress={isEditing ? handleEdit : addTask}
              disabled={title === '' && deadline === '' && category === ''}
            >
              <Text style={tw`text-white text-lg font-bold`}>
                {isEditing ? 'Simpan Perubahan' : 'Tambah Ibadah'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Category Filter with New Design */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-white text-xl font-bold mb-4`}>Filter Kategori</Text>
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-[#F4C542] w-30 p-2 items-center  rounded-full ${filterCategory === '' ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => setFilterCategory('')}
              >
                <Text style={tw`text-white font-bold`}>Semua</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-[#F4C542] w-30 p-2 items-center rounded-full ${filterCategory === 'Wajib' ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => setFilterCategory('Wajib')}
              >
                <Text style={tw`text-white font-bold`}>Wajib</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-[#F4C542] w-30 p-2 items-center rounded-full ${filterCategory === 'Sunnah' ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => setFilterCategory('Sunnah')}
              >
                <Text style={tw`text-white font-bold`}>Sunnah</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Task List with New Design */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-white text-xl font-bold mb-4`}>
              {filteredList.length === 0 ? 'Belum ada ibadah' : 'Daftar Ibadah'}
            </Text>
            
            <FlatList
              data={filteredList}
              keyExtractor={(item) => item.id}
              numColumns={1}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={tw`bg-[#1E2B29] p-4 rounded-xl mb-3 shadow-lg`}>
                  <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center gap-3 flex-1`}>
                      <TouchableOpacity onPress={() => toggleCheck(item.id)}>
                        {item.checked ? (
                          <View style={tw`bg-[#F4C542] p-2 rounded-lg`}>
                            <FontAwesome name="check" size={20} color="white" />
                          </View>
                        ) : (
                          <View style={tw`border-2 border-[#F4C542] p-2 rounded-lg`}>
                            <FontAwesome name="square-o" size={20} color="#F4C542" />
                          </View>
                        )}
                      </TouchableOpacity>
                      
                      <View style={tw`flex-1`}>
                        <Text style={tw`text-xl text-white font-bold ${item.checked ? 'line-through text-gray-400' : ''}`}>
                          {item.title}
                        </Text>
                        <Text style={tw`text-[#F4C542] ${item.checked ? 'line-through opacity-50' : ''}`}>
                          {item.deadline}
                        </Text>
                        <Text style={tw`text-gray-400 ${item.checked ? 'line-through' : ''}`}>
                          {item.category}
                        </Text>
                      </View>
                    </View>

                    <View style={tw`flex-row items-center gap-2`}>
                      {!item.checked && (
                        <TouchableOpacity
                          onPress={() => startEdit(item)}
                          style={tw`p-2`}
                        >
                          <MaterialIcons name="edit" size={24} color="#F4C542" />
                        </TouchableOpacity>
                      )}
                      
                      <TouchableOpacity
                        onPress={() => deleteTask(item.id)}
                        style={tw`p-2`}
                      >
                        <Entypo name="trash" size={24} color="#FF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
