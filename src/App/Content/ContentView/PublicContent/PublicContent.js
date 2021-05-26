import { View } from '@vkontakte/vkui'
import React, { useState } from 'react'
import Books from './Books/Books';
import PublicModalPages from './PublicModalPages/PublicModalPages';

const PublicContent = props => {
    const [book, setBook] = useState(null)
    const [libraryPoint, setLibraryPoint] = useState(null)
    const [activeModal, setActiveModal] = useState(null);
    const modal = <PublicModalPages
                        activeModal={activeModal} 
                        setActiveModal={setActiveModal} 
                        book={book} 
                        libraryPoint={libraryPoint} 
                        user={props.user} 
                        openLibraryPointInfo={openLibraryPointInfo}
                    />

    function openBookInfo (book) {
        setBook(book)
        setActiveModal('bookInfo')
    }

    function openLibraryPointInfo(libraryPoint, book) {
        setBook(book)
        setLibraryPoint(libraryPoint)
        setActiveModal('libraryPointInfo')
    }
    
    return (
        <View activePanel={props.activePanel} id={props.id} modal={modal}>
            <Books
                id='publicBooks'
                openBookInfo={openBookInfo}
                user={props.user}
                addBookButtonClick={() => setActiveModal('addBook')}
            />
        </View>
    )
}

export default PublicContent