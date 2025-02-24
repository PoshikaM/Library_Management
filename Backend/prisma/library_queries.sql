-- 1.
SELECT b.book_name, b.book_publisher AS author
FROM book b
LEFT JOIN issuance i ON b.book_id = i.book_id
WHERE i.book_id IS NULL;


-- 2.
SELECT 
    m.mem_name AS member_name, 
    b.book_name, 
    i.issuance_date, 
    i.target_return_date, 
    b.book_publisher AS author
FROM issuance i
JOIN member m ON i.issuance_member = m.mem_id
JOIN book b ON i.book_id = b.book_id
WHERE i.issuance_status = 'issued';


-- 3.
SELECT 
    b.book_name, 
    COUNT(i.book_id) AS times_borrowed, 
    COUNT(DISTINCT i.issuance_member) AS unique_members
FROM issuance i
JOIN book b ON i.book_id = b.book_id
GROUP BY b.book_name
ORDER BY times_borrowed DESC
LIMIT 10;
