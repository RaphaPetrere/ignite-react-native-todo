import React, {useRef, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pencil/edit.png'

import { Task } from './TasksList';

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps ) {
  const [beingEdited, setBeingEdited] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setBeingEdited(true);
  }

  function handleCancelEditing() {
    setEditedTitle(item.title);
    setBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, editedTitle);
    setBeingEdited(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(beingEdited) {
        textInputRef.current.focus();
      }
      else {
        textInputRef.current.blur();
      }
    }
  }, [beingEdited])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            //TODO - use style prop
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedTitle}
            onChangeText={setEditedTitle}
            editable={beingEdited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {
          beingEdited ?
          (
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon 
                name="x"
                size={24}
                color="#b2b2b2"
              />
            </TouchableOpacity>
          )
          :
          (
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          )
        }

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={beingEdited}
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{opacity: beingEdited ? .2 : 1}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196,196,196,0.24)',
    marginHorizontal: 12,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})