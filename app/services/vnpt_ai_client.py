import asyncio

class VNPTSmartReader:
    async def extract_prescription_info(self, image_content: bytes):
        # Giả lập độ trễ xử lý của AI (khoảng 1-2 giây)
        await asyncio.sleep(1.5)
        
        # Dữ liệu mẫu bóc tách từ đơn thuốc (Semantic JSON) [cite: 285, 314]
        return {
            "hospital_name": "Bệnh viện Đa khoa Quốc tế Vinmec",
            "diagnosis": "Viêm phế quản cấp - Đường thở đang bị viêm nhiễm, gây ho và khó thở", # [cite: 293, 294]
            "raw_text": "Chẩn đoán: Viêm phế quản cấp. Thuốc: Augmentin 1g - 2x1 - sau ăn - 5 ngày.", # [cite: 401]
            "medications": [
                {
                    "name": "Augmentin",
                    "dosage": "1g",
                    "frequency": "2 lần/ngày (2x1)",
                    "plain_vietnamese_advice": "Uống sau khi ăn. Thuốc này giúp diệt khuẩn gây viêm đường hô hấp." # [cite: 299, 310]
                }
            ]
        }

vnpt_smart_reader = VNPTSmartReader()