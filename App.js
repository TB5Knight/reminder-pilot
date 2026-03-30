import { useState } from 'react';
import { StyleSheet, FlatList, View, Platform } from 'react-native';
import { ThemeProvider, Text, Input, Button, CheckBox } from '@rneui/themed';

export default function App() {
  const data = [
    { key: '1', title: 'Title1' },
    { key: '2', title: 'Title2' }
  ];

const [tasks, setTasks] = useState([
  { key: '1', description: 'Clean room', completed: false },
  { key: '2', description: 'Make Dinner', completed: true },
  { key: '3', description: 'Finish School assignments', completed: false }
]);

const [newTask, setNewTask] = useState('');

  // Add task
const addTask = () => {
if (newTask.trim() === '') return;

 const newItem = {
 key: Date.now().toString(),
 description: newTask,
 completed: false
 };

setTasks([...tasks, newItem]);
 setNewTask('');
};


  // Toggle completion
  const toggleTask = (key) => {
    const updatedTasks = tasks.map(task =>
      task.key === key
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (key) => {
    const updatedTasks = tasks.filter(task => task.key !== key);
    setTasks(updatedTasks);
  };

  // Render each task
  const renderItem = ({ item }) => {
   return (
  <View style={styles.taskContainer}>
<CheckBox
  checked={item.completed}
  onPress={() => toggleTask(item.key)} 
/>

 <Text
 style={[
 styles.taskText,
item.completed && styles.completedTask
]}
 >
 {item.description}
 </Text>

<Button
 title="Delete Task"
color="red"
onPress={() => deleteTask(item.key)}
/>
</View>
);
  };

return (
  <ThemeProvider>
  <View style={styles.container}>

<View style={styles.navBar}>
  <Text style={styles.navTitle}>Reminder Pilot</Text>
</View>

<Text style={styles.greeting}>Hello User !</Text>

 {/* Input + Add Button */}
 <View style={styles.inputContainer}>
<Input
placeholder="Enter a task"
 value={newTask}
onChangeText={setNewTask}
containerStyle={{ flex: 1 }}
 />
 <Button title="Add Task" onPress={addTask} />
</View>

{/* Task List */}
<FlatList
data={tasks}
renderItem={renderItem}
 keyExtractor={(item) => item.key}
 />

 {/* Footer */}
<View style={styles.footer}>
  <Text style={styles.footerText}>Sign Out</Text>
</View>

</View>
  </ThemeProvider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CFCFCF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 10
  },

  greeting: {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 10,
  marginTop: 10
},
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

taskContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginVertical: 5
},

  taskText: {
    fontSize: 18
  },

navBar: {
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#B5F857',
  marginBottom: 10,
  borderRadius: 15,         
  marginHorizontal: 5 
},

navTitle: {
  color: '#070707',
  fontSize: 20,
  fontWeight: 'bold'
},

  // Strikethrough when completed
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray'
  },

  footer: {
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#B5F857',
  marginTop: 10,
  borderRadius: 15,         
  margin: 5  
},

footerText: {
  color: '#070707',
  fontSize: 18,
  fontWeight: 'bold'
},
});
