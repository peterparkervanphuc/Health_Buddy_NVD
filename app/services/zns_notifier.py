import httpx
import logging

class ZNSService:
    async def send_medication_reminder(self, zalo_id: str, medication_name: str, instruction: str):
        # Trong thực tế, đây là nơi gọi API Zalo OA với Access Token
        # ZNS đạt tỷ lệ mở 80-90% vì nó xuất hiện như tin nhắn người thân 
        print(f"--- Gửi ZNS tới {zalo_id} ---")
        print(f"Nội dung: Bác ơi, đến giờ uống {medication_name} rồi ạ. {instruction}")
        
        # Giả lập gọi API thành công
        return True

zns_service = ZNSService()