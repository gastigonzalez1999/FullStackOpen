import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Toggable'
import NoteForm from './components/NoteForm'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  //const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // const addNote = (noteObject) => {
  //   noteFormRef.current.toggleVisibility()
  //   noteService
  //     .create(noteObject)
  //     .then(returnedNote => {
  //       setNotes(notes.concat(returnedNote))
  //       setNewNote('')
  //     })
  // };

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id))
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <Togglable buttonLabel='login'>
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
              />
            </Togglable>
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
      )
    }

    const noteForm = () => (
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <NewNote/>
        <Notes />
      </div>
    </div>
  )
}

export default App;