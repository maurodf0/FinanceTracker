export const useAppToast = () => {
    const toast = useAppToast();

    return {
        toastSuccess: ({title, description = null}) => {  
            toast.add({
                title,
                description,
                icon: 'i-heroicons-check-circle',
                color: 'green'
            });
        },
        toastError: ({title, description = null}) => {
            toast.add({
                title,
                description,
                icon: 'i-heroicons-exclamation-circle',
                color: 'red'
            });
        }
    }
}