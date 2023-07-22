FROM python:3.9

# Chrome 웹 드라이버 다운로드
RUN apt-get update && apt-get install -y wget unzip \
    libglib2.0-0 \
    libnss3 \
    libgconf-2-4 \
    libfontconfig1
RUN wget -O /tmp/chromedriver.zip https://chromedriver.storage.googleapis.com/113.0.5672.63/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip -d /usr/local/bin/
RUN chmod +x /usr/local/bin/chromedriver

RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8888

# 컨테이너 실행 명령
CMD jupyter notebook --ip=0.0.0.0 --port=8888 --allow-root --no-browser
