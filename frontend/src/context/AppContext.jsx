import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
    const [openSidebar, setOpenSidebar] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, content: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?", sender: "bot" },
        { id: 2, content: "Tôi muốn tìm hiểu về React hooks. Bạn có thể giải thích cho tôi không?", sender: "user" },
        { id: 3, content: "Tất nhiên! React Hooks là một tính năng được giới thiệu trong React 16.8. Chúng cho phép bạn sử dụng state và các tính năng khác của React mà không cần viết class.", sender: "bot" },
        { id: 4, content: "Có thể cho tôi một ví dụ về cách sử dụng useState không?", sender: "user" },
        { id: 5, content: "Chắc chắn rồi! Đây là một ví dụ đơn giản về cách sử dụng useState:", sender: "bot" },
        { id: 6, content: "```javascript\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Bạn đã nhấp {count} lần</p>\n      <button onClick={() => setCount(count + 1)}>\n        Nhấp vào đây\n      </button>\n    </div>\n  );\n}\n```", sender: "bot" },
        { id: 7, content: "Cảm ơn bạn! Vậy còn useEffect thì sao?", sender: "user" },
        { id: 8, content: "useEffect được sử dụng để thực hiện các side effects trong các component.", sender: "bot" },
        { id: 9, content: "```javascript\nimport React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Bạn đã nhấp ${count} lần`;\n  });\n\n  return (\n    <div>\n      <p>Bạn đã nhấp {count} lần</p>\n      <button onClick={() => setCount(count + 1)}>\n        Nhấp vào đây\n      </button>\n    </div>\n  );\n}\n```", sender: "bot" },
        { id: 10, content: "Tuyệt vời! Tôi bắt đầu hiểu hơn về React Hooks rồi.", sender: "user" },
        { id: 11, content: "Rất vui khi bạn thấy hữu ích! Bạn có muốn tìm hiểu thêm về bất kỳ hook nào khác không?", sender: "bot" },
        { id: 12, content: "Có, tôi muốn biết về useContext. Nó được sử dụng như thế nào?", sender: "user" },
        { id: 13, content: "useContext cho phép bạn sử dụng Context API của React một cách dễ dàng hơn. Nó giúp bạn chia sẻ dữ liệu giữa các component mà không cần truyền props qua nhiều cấp. Đây là một ví dụ:", sender: "bot" },
        { id: 14, content: "```javascript\nimport React, { createContext, useContext, useState } from 'react';\n\nconst ThemeContext = createContext();\n\nfunction App() {\n  const [theme, setTheme] = useState('light');\n\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Toolbar />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction Toolbar() {\n  return (\n    <div>\n      <ThemedButton />\n    </div>\n  );\n}\n\nfunction ThemedButton() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return (\n    <button\n      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}\n      style={{background: theme === 'light' ? '#fff' : '#000', color: theme === 'light' ? '#000' : '#fff'}}\n    >\n      Đổi theme\n    </button>\n  );\n}", sender: "bot" },
        { id: 15, content: "Cảm ơn bạn rất nhiều! Bây giờ tôi đã hiểu rõ hơn về React Hooks.", sender: "user" },
        { id: 16, content: "Rất vui được giúp đỡ bạn! Nếu bạn có bất kỳ câu hỏi nào khác về React hoặc lập trình web, đừng ngần ngại hỏi nhé.", sender: "bot" },
    ])
    const contextValue = {
        openSidebar,
        setOpenSidebar,
        messages,
        setMessages
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}