import ApiBase from 'apis/config';

class RoomService extends ApiBase {
    getRoomData = (roomId: number) => {
        const url = `/room/${roomId}`;
        return this.get(url, {});
    }
    updateRoomData = (roomId: number, data: any) => {
        const url = `/room/${roomId}`;
        return this.put(url, data);
    }
    registerRfid = (roomId: number, ownerId: string) => {
        const url = `/room/rfid/register`;
        const body = {
            roomId: roomId,
            ownerId: ownerId,
        };
        return this.put(url, { body });
    
    }
}

const roomService = new RoomService();

export default roomService;
