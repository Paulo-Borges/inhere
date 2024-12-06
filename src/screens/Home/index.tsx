import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from '../Home/styles'
import { Participant } from "@/src/components/Participant";

export function Home() {

    // pra adicionar 
    const  [participants, setParticipants] = useState<string[]>([])
    // pra salvar 
    const  [participantsName, setParticipantsName] = useState('')


    function handlePartipantAdd() {

        if (participants.includes(participantsName)) {
            return  Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome!")
        }
   
        setParticipants((prevState) => [...prevState, participantsName])
        setParticipantsName('')
    }

    function handlePartipantRemove(name: string) {

        

        Alert.alert("remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                                                            //    retorna todos os participantes    menos o que tem o nome
                onPress: () => setParticipants(prevState => prevState.filter(participants => participants !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
        <Text style={styles.eventName} >Dia das Mães</Text>
        <Text style={styles.eventDate} > Domingo, 11 de Maio de 2025</Text>

        <View style={styles.form}>
        <TextInput 
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor='#6b6b6b'
        onChangeText={setParticipantsName}
        value={participantsName}
        />

        <TouchableOpacity style={styles.button} onPress={handlePartipantAdd}>
            <Text style={styles.buttonText}>
            +
            </Text>
        </TouchableOpacity>
        </View>

         {/* pra Gerar o cartao */}
         <FlatList 
         data={participants}
         keyExtractor={item => item}
         renderItem={({ item }) => (
                <Participant 
                key={item}
                name={item} 
                onRemove={() => handlePartipantRemove(item)}
                />
         )}
         showsVerticalScrollIndicator={false}
         ListEmptyComponent={() => (
             
             <Text style={styles.buttonText}>
                    Adicione participantes a sua lista de presença.
            </Text>
        
         )}
         />
         
        // {/* pra Gerar o cartao
        // <ScrollView showsVerticalScrollIndicator={false}>
        // {
        //     participants.map(participant => (
        //         <Participant 
        //         key={participant}
        //         name={participant} 
        //         onRemove={() => handlePartipantRemove('Julia')} />
        //     ))
        // }
        // </ScrollView> */}
       
        </View>
    )
}
