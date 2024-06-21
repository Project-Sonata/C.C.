import usePlayer from "./usePlayer";


const useOnPause = () => {
    const player = usePlayer()

    const onPause = () => {
        player.setIsActive(false)
    }

    return onPause
}

export default useOnPause;