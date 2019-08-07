export default {
    inputField: {
        width: 280,
        color: '#82D4E3',
        borderColor: 'white',
        backgroundColor: 'white',
        marginTop: 5,
        borderWidth: 2,  // size/width of the border
        borderColor: 'lightgrey'
    },
    Wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#82D4E3'
    },
    text: {
        color: 'white',
        fontSize: 23
    },
    ButtonContainer: {
        borderColor: 'white',
        borderWidth: 1,
        width: 280,
        alignItems: 'center',
        borderRadius: 12,
        color: 'white',
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 4,
        marginTop: 10,
        textAlign: 'center',
    },
    container: {
        width: 280,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    item: {
        width: '50%' // is 50% of container width
    }
};