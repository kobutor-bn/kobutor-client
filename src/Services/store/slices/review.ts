import {createSlice} from '@reduxjs/toolkit'
import watch from '../../../assets/watch.jpg';
import chair from '../../../assets/chair.jpg';
import camera from '../../../assets/camera.jpg';

const initialState: IReview.Item[] =
    [
        {
            id: "1",
            description: "Lorem ipsum dolor sit amet, Mauris luctus felis arcu. Nulla sollicitudin egestas erat, eget euismod felis dignissim vitae. Sed imperdiet purus nulla, non dignissim nibh pulvinar in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet nisl maximus, eleifend urna id, viverra purus. Cras metus felis, tempor ac pharetra in, varius ut metus. Etiam in erat eget orci commodo viverra eu ac metus.",
            reviewer: "John Doe",
            pictures: [watch],
            createdAt: "2/5/2024"
        },
        {
            id: "2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac convallis lacus. Integer blandit consectetur rutrum. Pellentesque vel fringilla purus. In hac habitasse platea dictumst. Vivamus nec nulla eu lectus dapibus tristique. Nulla vehicula sed magna vitae pellentesque. Nunc congue eu urna vitae elementum. Mauris luctus felis arcu. Nulla sollicitudin egestas erat, eget euismod felis dignissim vitae. Sed imperdiet purus nulla, non dignissim nibh pulvinar in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet nisl maximus, eleifend urna id, viverra purus. Cras metus felis, tempor ac pharetra in, varius ut metus. Etiam in erat eget orci commodo viverra eu ac metus.",
            reviewer: "John Doe",
            pictures: [chair],
            createdAt: "2/5/2024"
        },
        {
            id: "4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac convallis lacus. Integer blandit consectetur rutrum. Pellentesque vel fringilla purus. In hac habitasse platea dictumst. Vivamus nec nulla eu lectus dapibus tristique. Nulla vehicula sed magna vitae pellentesque. Nunc congue eu urna vitae elementum. Mauris luctus felis arcu. Nulla sollicitudin egestas erat, eget euismod felis dignissim vitae. Sed imperdiet purus nulla, non dignissim nibh pulvinar in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet nisl maximus, eleifend urna id, viverra purus. Cras metus felis, tempor ac pharetra in, varius ut metus. Etiam in erat eget orci commodo viverra eu ac metus.",
            reviewer: "John Doe",
            pictures: [camera],
            createdAt: "2/5/2024"
        },
        {
            id: "3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac convallis lacus. Integer blandit consectetur rutrum. Pellentesque vel fringilla purus. In hac habitasse platea dictumst. Vivamus nec nulla eu lectus dapibus tristique. Nulla vehicula sed magna vitae pellentesque. Nunc congue eu urna vitae elementum. Mauris luctus felis arcu. Nulla sollicitudin egestas erat, eget euismod felis dignissim vitae. Sed imperdiet purus nulla, non dignissim nibh pulvinar in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet nisl maximus, eleifend urna id, viverra purus. Cras metus felis, tempor ac pharetra in, varius ut metus. Etiam in erat eget orci commodo viverra eu ac metus.",
            reviewer: "John Doe",
            pictures: [chair],
            createdAt: "2/5/2024"
        },
        {
            id: "5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac convallis lacus. Integer blandit consectetur rutrum. Pellentesque vel fringilla purus. In hac habitasse platea dictumst. Vivamus nec nulla eu lectus dapibus tristique. Nulla vehicula sed magna vitae pellentesque. Nunc congue eu urna vitae elementum. Mauris luctus felis arcu. Nulla sollicitudin egestas erat, eget euismod felis dignissim vitae. Sed imperdiet purus nulla, non dignissim nibh pulvinar in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet nisl maximus, eleifend urna id, viverra purus. Cras metus felis, tempor ac pharetra in, varius ut metus. Etiam in erat eget orci commodo viverra eu ac metus.",
            reviewer: "John Doe",
            pictures: [watch],
            createdAt: "2/5/2024"
        },
        {
            id: "6",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac convallis lacus. Integer blandit consectetur rutrum. Pellentesque vel fringilla purus. In hac habitasse platea dictumst. Vivamus nec nulla eu lectus dapibus tristique. Nulla vehicula sed magna vitae pellentesque. Nunc congue eu urna vitae elementum. Mauris luctus felis arcu. Nulla sollicitudin egestas erat, eget euismod felis dignissim vitae. Sed imperdiet purus nulla, non dignissim nibh pulvinar in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet nisl maximus, eleifend urna id, viverra purus. Cras metus felis, tempor ac pharetra in, varius ut metus. Etiam in erat eget orci commodo viverra eu ac metus.",
            reviewer: "John Doe",
            pictures: [camera],
            createdAt: "2/5/2024"
        },
    ]

export const ReviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
})

// Action creators are generated for each case reducer function
// export const {handleOverlayClick, setIsFocused, handleInputFocus} = SearchState.actions

export default ReviewSlice.reducer