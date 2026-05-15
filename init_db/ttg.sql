-- Active: 1778244155555@@127.0.0.1@5432@ttg
-- CREATE DATABASE ttg;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    picture_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TRUNCATE TABLE users RESTART IDENTITY CASCADE;
-- ลบ users และรี ID
SELECT * FROM users;


CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    rating FLOAT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    place_name VARCHAR(100) NOT NULL
);

-- TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;
SELECT * FROM reviews;

CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL,
    reviews INT NOT NULL,
    image TEXT NOT NULL,
    tags JSONB NOT NULL,
    popular BOOLEAN NOT NULL DEFAULT FALSE
);

-- TRUNCATE TABLE places RESTART IDENTITY CASCADE; -- ลบ places และรี ID
SELECT * FROM places;

INSERT INTO
    places
VALUES (
        1,
        'วัดพระศรีรัตนศาสดาราม',
        'กรุงเทพมหานครฯ',
        'ภาคกลาง',
        'วัดและศาสนา',
        4.6,
        860,
        'https://static.thairath.co.th/media/dFQROr7oWzulq5FZUEh3MRrERXP2ZCRNt1ty78Z5HuJ2mEG4frJaJLYSmi7PuWvciU0.jpg',
        '["วัด","ประวัติศาสตร์"]',
        true
    );

INSERT INTO
    places
VALUES (
        2,
        'วัดอรุณราชวราราม ราชวรมหาวิหาร',
        'กรุงเทพมหานครฯ',
        'ภาคกลาง',
        'วัดและศาสนา',
        4.8,
        975,
        'https://www.dhammathai.org/watthai/bangkok/pic/watarun_yak.jpg',
        '["วัด","ประวัติศาสตร์"]',
        true
    );

INSERT INTO
    places
VALUES (
        3,
        'พิพิธภัณฑ์วิทยาศาสตร์แห่งชาติ',
        'ปทุมธานี',
        'ภาคกลาง',
        'พิพิธภัณฑ์',
        4.2,
        552,
        'https://www.nsm.or.th/nsm/sites/default/files/2021-11/%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C.jpg',
        '["สถาปัตยกรรม","วัฒนธรรม"]',
        false
    );

INSERT INTO
    places
VALUES (
        4,
        'ตลาดร่มหุบ',
        'สมุทรสงคราม',
        'ภาคกลาง',
        'ตลาดและชุมชน',
        4.2,
        784,
        'https://files.thailandtourismdirectory.go.th/assets/upload/2023/1/12//54175a88-db71-447a-ba9a-3a6eec780747.png',
        '["อาหาร","วัฒนธรรม"]',
        true
    );

INSERT INTO
    places
VALUES (
        5,
        'เจ็ดคด-โป่งก้อนเส้า',
        'สระบุรี',
        'ภาคกลาง',
        'อุทยานธรรมชาติ',
        3.3,
        369,
        'https://img.kapook.com/u/2019/supattra_wat/pong/p9.jpg',
        '["ธรรมชาติ","แคมป์ปิ้ง"]',
        false
    );

INSERT INTO
    places
VALUES (
        6,
        'หุบป่าตาด',
        'อุทัยธานี',
        'ภาคกลาง',
        'ภูเขาและน้ำตก',
        4.1,
        546,
        'https://www.palanla.com/ckeditor/upload/files/id37/domestic_location/Hup%20Pa%20Tat/001.jpg',
        '["ธรรมชาติ","ปีนเขา"]',
        true
    );

INSERT INTO
    places
VALUES (
        7,
        'บ่อน้ำสีฟ้า',
        'กำแพงเพชร',
        'ภาคกลาง',
        'อุทยานธรรมชาติ',
        3.9,
        211,
        'https://cms.dmpcdn.com/travel/2020/11/05/e8273ac0-1f4d-11eb-bdc6-db3ea5673cdc_original.jpg',
        '["ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        8,
        'ตลาดไทยย้อนยุคบ้านระจัน',
        'สิงห์บุรี',
        'ภาคกลาง',
        'ตลาดและชุมชน',
        4.1,
        673,
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/12/a3/ac/caption.jpg?w=900&h=500&s=1',
        '["วัฒนธรรม","ประวัติศาสตร์","อาหาร"]',
        false
    );

INSERT INTO
    places
VALUES (
        9,
        'พาสาน',
        'นครสวรรค์',
        'ภาคกลาง',
        'สถาปัตยกรรม',
        3.9,
        343,
        'https://cms.dmpcdn.com/travel/2020/03/26/7df93370-6f4d-11ea-a7cd-dd316e61efc7_original.jpg',
        '["ธรรมชาติ","สถาปัตยกรรม"]',
        true
    );

INSERT INTO
    places
VALUES (
        10,
        'เมืองโบราณ',
        'สมุทรปราการ',
        'ภาคกลาง',
        'สถาปัตยกรรม',
        4.7,
        656,
        'https://f.ptcdn.info/062/046/000/odpie07ncXXw1I1wsNK-o.jpg',
        '["ประวัติศาสตร์","สถาปัตยกรรม"]',
        true
    );

INSERT INTO
    places
VALUES (
        11,
        'บ้านรักไทย',
        'แม่ฮ่องสอน',
        'ภาคเหนือ',
        'ตลาดและชุมชน',
        3.8,
        613,
        'https://ak-d.tripcdn.com/images/1i63422348sfa23kwE6A3.jpg?proc=source/trip',
        '["วัฒนธรรม","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        12,
        'ขุนช่างเคี่ยน',
        'เชียงใหม่',
        'ภาคเหนือ',
        'ตลาดและชุมชน',
        4.0,
        465,
        'https://img.kapook.com/u/2023/sireeporn/Travel-01/Khun%20Chang%20Khian_02.jpg',
        '["วัฒนธรรม","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        13,
        'อุทยานแห่งชาติดอยอินทนนท์',
        'เชียงใหม่',
        'ภาคเหนือ',
        'อุทยานธรรมชาติ',
        4.7,
        882,
        'https://image-tc.galaxy.tf/wijpeg-sxrfid5inslt46adwg0pwpho/intanon_standard.jpg?crop=112%2C0%2C1777%2C1333',
        '["ธรรมชาติ","ปีนเขา"]',
        true
    );

INSERT INTO
    places
VALUES (
        14,
        'อุทยานแห่งชาติแม่ปิง',
        'ลำพูน',
        'ภาคเหนือ',
        'อุทยานธรรมชาติ',
        4.2,
        433,
        'https://s359.kapook.com/pagebuilder/17bb02cf-9a01-4bbd-8eb1-4727050da5f3.jpg',
        '["เดินป่า","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        15,
        'วัดป่าดาราภิรมย์',
        'เชียงใหม่ ',
        'ภาคเหนือ',
        'วัดและศาสนา',
        3.3,
        194,
        'https://s.isanook.com/tr/0/ud/279/1397445/watphadarabhirom2.jpg',
        '["ประวัติศาสตร์","สถาปัตยกรรม","ธรรมะ"]',
        false
    );

INSERT INTO
    places
VALUES (
        16,
        'วัดเจดีย์หลวง',
        'เชียงใหม่',
        'ภาคเหนือ',
        'สถาปัตยกรรม',
        3.7,
        365,
        'https://mpics.mgronline.com/pics/Images/564000008034601.JPEG',
        '["สถาปัตยกรรม","ประวัติศาสตร์"]',
        false
    );

INSERT INTO
    places
VALUES (
        17,
        'หอศิลป์ริมน่าน',
        'น่าน',
        'ภาคเหนือ',
        'พิพิธภัณฑ์',
        3.6,
        294,
        'https://www.hiclasssociety.com/wp-content/uploads/2017/06/%E0%B8%AB%E0%B8%AD%E0%B8%A8%E0%B8%B4%E0%B8%A5%E0%B8%9B%E0%B9%8C%E0%B8%A3%E0%B8%B4%E0%B8%A1%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B8%99.jpg',
        '["ประวัติศาสตร์","วัฒนธรรม"]',
        false
    );

INSERT INTO
    places
VALUES (
        18,
        'น้ำตกสะปัน',
        'น่าน',
        'ภาคเหนือ',
        'ภูเขาและน้ำตก',
        4.5,
        666,
        'https://dongphayanan.go.th/_files_aorbortor/041255/tour/041255_0_20211013-111931.jpg',
        '["เดินป่า","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        19,
        'น้ำตกผาเสื่อ',
        'แม่ฮ่องสอน',
        'ภาคเหนือ',
        'ภูเขาและน้ำตก',
        4.0,
        435,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAt835-dVtrioiAxIfGnbJZBXCLixYV3IHg&s',
        '["ธรรมชาติ","ปีนเขา"]',
        false
    );

INSERT INTO
    places
VALUES (
        20,
        'น้ำตกห้วยโรง',
        'แพร่',
        'ภาคเหนือ',
        'ภูเขาและน้ำตก',
        3.9,
        352,
        'https://f.tpkcdn.com/images-source/b5709dadcfd388826c42d05785c6c18a.JPG',
        '["tag","tag"]',
        false
    );

INSERT INTO
    places
VALUES (
        21,
        'อุทยานแห่งชาติเขาใหญ่',
        'นครราชสีมา',
        'ภาคตะวันออกเฉียงเหนือ',
        'อุทยานธรรมชาติ',
        4.7,
        455,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUc8qz7ahPTjOj63d20D-EGa8V8S6kDtdsBQ&s',
        '["ปีนเขา","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        22,
        'ภูป่าเปาะ',
        'เลย',
        'ภาคตะวันออกเฉียงเหนือ',
        'ภูเขาและน้ำตก',
        4.1,
        554,
        'https://s.isanook.com/tr/0/ud/283/1417381/942400_1.jpg?ip/resize/w728/q80/jpg',
        '["เดินป่า","ปีนเขา"]',
        false
    );

INSERT INTO
    places
VALUES (
        23,
        'น้ำตกตาดวิมานทิพย์',
        'บึงกาฬ',
        'ภาคตะวันออกเฉียงเหนือ',
        'ภูเขาและน้ำตก',
        4.3,
        347,
        'https://s.isanook.com/tr/0/ud/283/1416921/gth.jpg',
        '["ธรรมชาติ","เดินป่า"]',
        false
    );

INSERT INTO
    places
VALUES (
        24,
        'น้ำตกถ้ำโสดา',
        'ร้อยเอ็ด',
        'ภาคตะวันออกเฉียงเหนือ',
        'ภูเขาและน้ำตก',
        4.0,
        743,
        'https://cms.dmpcdn.com/travel/2020/08/13/b0a2e730-dd11-11ea-a0b4-232d08119930_original.jpg',
        '["เดินป่า","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        25,
        'แก่งคุดคู้',
        'เลย',
        'ภาคตะวันออกเฉียงเหนือ',
        'อุทยานธรรมชาติ',
        3.7,
        655,
        'https://img.wongnai.com/p/1248x0/2018/07/14/e1d598f6fbef43f8bde4eecd5f69f843.jpg',
        '["ธรรมชาติ","วัฒนธรรม"]',
        false
    );

INSERT INTO
    places
VALUES (
        26,
        'วัดพระธาตุพนมวรมหาวิหาร',
        'นครพนม',
        'ภาคตะวันออกเฉียงเหนือ',
        'วัดและศาสนา',
        3.9,
        758,
        'https://img.wongnai.com/p/800x0/2018/06/04/5f28c199fb214dafbafd96759d82116e.jpg',
        '["ธรรมะ","วัฒนธรรม"]',
        false
    );

INSERT INTO
    places
VALUES (
        27,
        'วัดป่าภูก้อน',
        'อุดรธานี',
        'ภาคตะวันออกเฉียงเหนือ',
        'วัดและศาสนา',
        4.6,
        433,
        'https://img.wongnai.com/p/800x0/deleted/2018/07/06/ded0a99bc1194a62ac91237d8eec3aa1.jpg',
        '["วัฒนธรรม","สถาปัตยกรรม"]',
        true
    );

INSERT INTO
    places
VALUES (
        28,
        'สวนสาธารณะหนองประจักษ์ศิลปาคม',
        'อุดรธานี',
        'ภาคตะวันออกเฉียงเหนือ',
        'อุทยานธรรมชาติ',
        3.6,
        322,
        'https://img.wongnai.com/p/1248x0/2018/08/02/5647cd857fa6466795c147d49d7e7ea3.jpg',
        '["ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        29,
        'พิพิธภัณฑ์สิรินธร',
        'กาฬสินธุ์',
        'ภาคตะวันออกเฉียงเหนือ',
        'พิพิธภัณฑ์',
        4.8,
        758,
        'https://img.wongnai.com/p/1248x0/2018/09/12/43a5093ea9274c0c8eb4e8492a3cbbe3.jpg',
        '["ประวัติศาสตร์","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        30,
        'น้ำตกถ้ำพระ',
        'บึงกาฬ',
        'ภาคตะวันออกเฉียงเหนือ',
        'ภูเขาและน้ำตก',
        4.3,
        656,
        'https://img.wongnai.com/p/800x0/2018/06/04/7c0199e4b7c84f4fb2af3e1147fa4332.jpg',
        '["แคมป์ปิ้ง","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        31,
        'เกาะล้าน',
        'ชลบุรี',
        'ภาคตะวันออก',
        'ชายหาด',
        4.6,
        721,
        'https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-22T125922.412.png',
        '["ดำน้ำ","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        32,
        'เกาะสีชัง',
        'ชลบุรี',
        'ภาคตะวันออก',
        'ชายหาด',
        4.4,
        538,
        'https://f.ptcdn.info/945/037/000/nyq4hwysk8aj7mP4tJ-o.jpg',
        '["ดำน้ำ","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        33,
        'เกาะเสม็ด',
        'ระยอง',
        'ภาคตะวันออก',
        'ชายหาด',
        3.8,
        462,
        'https://res.klook.com/image/upload/q_85/c_fill,w_750/v1674225206/blog/w0ms8ri9sahsgcuo8ixx.jpg',
        '["ดำน้ำ","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        34,
        'เกาะช้าง',
        'ตราด',
        'ภาคตะวันออก',
        'ชายหาด',
        4.4,
        697,
        'https://maneechan.com/wp-content/uploads/2026/03/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%B0%E0%B8%8A%E0%B9%89%E0%B8%B2%E0%B8%87-%E0%B8%88%E0%B8%B8%E0%B8%94%E0%B8%94%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3-%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%B0%E0%B8%8A%E0%B9%89%E0%B8%B2%E0%B8%87-1024x581.webp',
        '["ดำน้ำ","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        35,
        'อันเดอร์วอเตอร์ เวิลด์',
        'ชลบุรี',
        'ภาคตะวันออก',
        'อุทยานธรรมชาติ',
        4.3,
        987,
        'https://ak-d.tripcdn.com/images/1lo4s12000chloxr1B938_W_1440_810_Q80.webp?proc=source%2ftrip',
        '["ธรรมชาติ","อาหาร"]',
        true
    );

INSERT INTO
    places
VALUES (
        36,
        'วัดสมานรัตนาราม',
        'ฉะเชิงเทรา',
        'ภาคตะวันออก',
        'วัดและศาสนา',
        4.0, 
        888,
        'https://ak-d.tripcdn.com/images/0ww0512000cjpf37rE7A5_W_1440_810_Q80.webp?proc=source%2ftrip',
        '["สถาปัตยกรรม","ธรรมะ"]',
        true
    );

INSERT INTO
    places
VALUES (
        37,
        'หาดทรายดำ',
        'ตราด',
        'ภาคตะวันออก',
        'อุทยานธรรมชาติ',
        4.2,
        675,
        'https://s359.kapook.com/pagebuilder/7b0bbc9a-39eb-4832-b40d-49aa2ec07a5b.jpg',
        '["ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        38,
        'อุทยานแห่งชาติน้ำตกพลั่ว',
        'จันทบุรี',
        'ภาคตะวันออก',
        'อุทยานธรรมชาติ',
        4.1,
        342,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6wkZnpoOneieH_V_H-Hid9Qc7i9MAFtRAKA&s',
        '["เดินป่า","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        39,
        'อุทยานแห่งชาติทับลาน',
        'ปราจีนบุรี',
        'ภาคตะวันออก',
        'อุทยานธรรมชาติ',
        4.8,
        795,
        'https://cms.dmpcdn.com/travel/2022/12/28/486b0e50-8673-11ed-8021-416db3b9bc71_webp_original.jpg',
        '["เดินป่า","ปีนเขา"]',
        true
    );

INSERT INTO
    places
VALUES (
        40,
        'พิพิธภัณฑสถานแห่งชาติปราจีนบุรี',
        'ปราจีนบุรี',
        'ภาคตะวันออก',
        'พิพิธภัณฑ์',
        4.1,
        672,
        'https://cms.dmpcdn.com/travel/2021/01/25/527a2570-5ecf-11eb-9382-5dad63c3d9d6_original.jpg',
        '["ประวัติศาสตร์","วัฒนธรรม"]',
        true
    );

INSERT INTO
    places
VALUES (
        41,
        'เขื่อนรัชชประภา',
        'สุราษฎร์ธานี',
        'ภาคใต้',
        'ชายหาด',
        4.0,
        645,
        'https://cms.dmpcdn.com/travel/2024/11/28/42ef8620-ad74-11ef-a220-a517bd0bbc94_webp_original.webp',
        '["ดำน้ำ","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        42,
        'ป่าต้นน้ำบ้านน้ำราด',
        'สุราษฎร์ธานี',
        'ภาคใต้',
        'อุทยานธรรมชาติ',
        3.9,
        866,
        'https://cms.dmpcdn.com/travel/2024/11/28/90717160-ad74-11ef-a220-a517bd0bbc94_webp_original.webp',
        '["เดินป่า","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        43,
        'อุทยานธรรมเขานาในหลวง',
        'สุราษฎร์ธานี',
        'ภาคใต้',
        'อุทยานธรรมชาติ',
        4.4,
        545,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqikiI5MSl-TOPS0_iznaV-kbDneLnXr5mkw&s',
        '["เดินป่า","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        44,
        'ทะเลหมอกจาเราะกางา',
        'ยะลา',
        'ภาคใต้',
        'ภูเขาและน้ำตก',
        4.5,
        977,
        'https://cms.dmpcdn.com/travel/2024/11/28/ce6a8140-ad75-11ef-a220-a517bd0bbc94_webp_original.webp',
        '["ปีนเขา","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        45,
        'สกายวอล์กอัยเยอร์เวง',
        'ยะลา',
        'ภาคใต้',
        'สถาปัตยกรรม',
        4.6,
        675,
        'https://cms.dmpcdn.com/travel/2024/11/28/b7127100-ad76-11ef-a220-a517bd0bbc94_webp_original.webp',
        '["สถาปัตยกรรม","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        46,
        'เกาะไข่นอก',
        'พังงา',
        'ภาคใต้',
        'ชายหาด',
        4.3,
        544,
        'https://dimg04.tripcdn.com/images/1n961224x8xz42pki4171.webp',
        '["ดำน้ำ","ธรรมชาติ"]',
        true
    );

INSERT INTO
    places
VALUES (
        47,
        'หมู่เกาะพีพี',
        'กระบี่',
        'ภาคใต้',
        'ชายหาด',
        4.5,
        976,
        'https://dimg04.tripcdn.com/images/1n936224x8xz3zwb06A39.webp',
        '["ดำน้ำ","ธรรมชาติ"]',
        false
    );

INSERT INTO
    places
VALUES (
        48,
        'วัดพระมหาเจดีย์ไตรภพไตรมงคล',
        'สงขลา',
        'ภาคใต้',
        'วัดและศาสนา',
        4.4,
        576,
        'https://cms.dmpcdn.com/travel/2020/09/11/7151c750-f38b-11ea-b369-edee981b0720_original.jpg',
        '["ธรรมะ","วัฒนธรรม"]',
        true
    );

INSERT INTO
    places
VALUES (
        49,
        'วัดแหลมสอ',
        'สุราษฏร์ธานี',
        'ภาคใต้',
        'วัดและศาสนา',
        4.0,
        557,
        'https://cms.dmpcdn.com/travel/2020/10/21/d99f7f40-1367-11eb-a54d-490661e142b8_original.jpg',
        '["ประวัติศาสตร์","สถาปัตยกรรม"]',
        false
    );

INSERT INTO
    places
VALUES (
        50,
        'วัดบางโทง',
        'กระบี่',
        'ภาคใต้',
        'วัดและศาสนา',
        4.6,
        555,
        'https://cms.dmpcdn.com/travel/2020/09/24/92275c30-fe60-11ea-97d1-9b25f7c1636a_original.jpg',
        '["วัฒนธรรม","ธรรมะ"]',
        false
    );   