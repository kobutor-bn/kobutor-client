declare namespace ISearch {
    interface Item {
        title: string,
        link: string,
    }

    interface State {
        items: Item[],
        isFocused: boolean,
    }
}