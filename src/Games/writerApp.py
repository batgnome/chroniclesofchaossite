import sys
import ctypes
from ctypes import windll, byref, sizeof
from ctypes.wintypes import HWND
from PyQt6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QTextEdit,
    QPushButton, QHBoxLayout, QFileDialog
)
from PyQt6.QtCore import Qt, QPoint


# --------------------
# WINDOWS BLUR SETUP
# --------------------
class ACCENT_STATE:
    ACCENT_DISABLED = 0
    ACCENT_ENABLE_BLURBEHIND = 3
    ACCENT_ENABLE_ACRYLICBLURBEHIND = 4

class ACCENT_POLICY(ctypes.Structure):
    _fields_ = [("AccentState", ctypes.c_int),
                ("AccentFlags", ctypes.c_int),
                ("GradientColor", ctypes.c_int),
                ("AnimationId", ctypes.c_int)]

class WINDOWCOMPOSITIONATTRIBDATA(ctypes.Structure):
    _fields_ = [("Attribute", ctypes.c_int),
                ("Data", ctypes.c_void_p),
                ("SizeOfData", ctypes.c_size_t)]

def enable_blur(hwnd):
    accent = ACCENT_POLICY()
    accent.AccentState = ACCENT_STATE.ACCENT_ENABLE_ACRYLICBLURBEHIND
    accent.GradientColor = 0x99000000  # AABBGGRR
    data = WINDOWCOMPOSITIONATTRIBDATA()
    data.Attribute = 19
    data.Data = ctypes.cast(byref(accent), ctypes.c_void_p)
    data.SizeOfData = sizeof(accent)
    windll.user32.SetWindowCompositionAttribute(HWND(hwnd), byref(data))


# --------------------
# MAIN APP
# --------------------
class GhostWriter(QWidget):
    def __init__(self):
        super().__init__()

        # Core settings
        self.setWindowFlags(Qt.WindowType.FramelessWindowHint | Qt.WindowType.WindowStaysOnTopHint)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.setObjectName("GhostWriter")
        self.setStyleSheet("""
            GhostWriter {
                background-color: rgba(0, 0, 0, 50);  /* prevents click-through */
            }
        """)
        self.setFixedSize(800, 600)
        self.old_pos = QPoint()

        # Layout
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)

        # Background filler (prevents click-through)
        self.background = QWidget()
        self.background.setStyleSheet("background-color: rgba(0, 0, 0, 50);")
        self.background.setAttribute(Qt.WidgetAttribute.WA_StyledBackground)

        # Stack layout
        inner_layout = QVBoxLayout(self.background)
        inner_layout.setContentsMargins(0, 0, 0, 0)
        inner_layout.addWidget(self.create_title_bar())
        self.text_edit = QTextEdit()
        self.text_edit.setStyleSheet("""
            QTextEdit {
                background: transparent;
                color: white;
                font-size: 18px;
                border: none;
                padding: 20px;
            }
        """)
        inner_layout.addWidget(self.text_edit)

        layout.addWidget(self.background)


    def create_title_bar(self):
        title_bar = QWidget()
        title_bar.setFixedHeight(40)
        title_bar.setStyleSheet("background: rgba(0,0,0,100);")

        # Buttons
        close_btn = QPushButton("✕")
        minimize_btn = QPushButton("–")
        open_btn = QPushButton("📂")
        save_btn = QPushButton("💾")

        for btn in (close_btn, minimize_btn, open_btn, save_btn):
            btn.setFixedSize(30, 30)
            btn.setStyleSheet("""
                QPushButton {
                    background-color: rgba(255, 255, 255, 30);
                    color: white;
                    border: none;
                    font-size: 16px;
                }
                QPushButton:hover {
                    background-color: rgba(255, 255, 255, 60);
                }
            """)

        # Connect logic
        close_btn.clicked.connect(self.close)
        minimize_btn.clicked.connect(self.showMinimized)
        open_btn.clicked.connect(self.open_file)
        save_btn.clicked.connect(self.save_file)

        # Layout
        layout = QHBoxLayout(title_bar)
        layout.setContentsMargins(10, 0, 10, 0)
        layout.addStretch()
        layout.addWidget(open_btn)
        layout.addWidget(save_btn)
        layout.addWidget(minimize_btn)
        layout.addWidget(close_btn)

        return title_bar

    def open_file(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Open File", "", "Text Files (*.txt)")
        if file_path:
            with open(file_path, 'r', encoding='utf-8') as f:
                self.text_edit.setText(f.read())

    def save_file(self):
        file_path, _ = QFileDialog.getSaveFileName(self, "Save File", "", "Text Files (*.txt)")
        if file_path:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(self.text_edit.toPlainText())

    # Drag window
    def mousePressEvent(self, event):
        if event.button() == Qt.MouseButton.LeftButton:
            self.old_pos = event.globalPosition().toPoint()

    def mouseMoveEvent(self, event):
        if event.buttons() == Qt.MouseButton.LeftButton:
            delta = event.globalPosition().toPoint() - self.old_pos
            self.move(self.x() + delta.x(), self.y() + delta.y())
            self.old_pos = event.globalPosition().toPoint()


# --------------------
# LAUNCH
# --------------------
app = QApplication(sys.argv)
window = GhostWriter()
window.show()
enable_blur(int(window.winId()))
sys.exit(app.exec())
