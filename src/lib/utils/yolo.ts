export const yolo = {
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  },
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  async fetch<T>(gen: () => T) {
    await this.delay(this.getRandomInt(100, 300))
    const i = Math.random()
    if (i > .5) throw new Error('Fake error')
    return gen()
  }
}
