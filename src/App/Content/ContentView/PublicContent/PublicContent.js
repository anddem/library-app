import { View } from '@vkontakte/vkui'
import React, { useState } from 'react'
import LibraryPoints from './LibraryPoints';
import Books from './Books/Books';
import PublicModalPages from './PublicModalPages/PublicModalPages';

const PublicContent = props => {
    const [book, setBook] = useState(null)
    const [libraryPoint, setLibraryPoint] = useState(null)
    const modal = <PublicModalPages
                        activeModal={props.activeModal} 
                        setActiveModal={props.setActiveModal} 
                        book={book} 
                        libraryPoint={libraryPoint} 
                        user={props.user} 
                        openLibraryPointInfo={openLibraryPointInfo}
                    />

    function openBookInfo (book) {
        setBook(book)
        props.setActiveModal('bookInfo')
    }

    function openLibraryPointInfo(libraryPoint, book) {
        setBook(book)
        setLibraryPoint(libraryPoint)
        props.setActiveModal('libraryPointInfo')
    }
    
    function openPointInfo(point) {
        setLibraryPoint(point)
        props.setActiveModal('additionalLibraryPoint')
    }

    return (
        <View activePanel={props.activePanel} id={props.id} modal={modal}>
            <Books
                id='publicBooks'
                openBookInfo={openBookInfo}
                user={props.user}
                addBookButtonClick={() => props.setActiveModal('addBook')}
            />
            <LibraryPoints
                id='publicLibraryPoints'
                user={props.user}
                openPointInfo={openPointInfo}
            />
        </View>
    )
}

export default PublicContent