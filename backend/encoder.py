import torch
import torch.nn as nn

class SequenceEncoder(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, bidirectional=False):
        super(SequenceEncoder, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.num_directions = 2 if bidirectional else 1
        self.rnn = nn.GRU(input_size, hidden_size, num_layers, batch_first=True, bidirectional=bidirectional)

    def forward(self, x):
        # x: batch_size x seq_len x input_size
        h0 = torch.zeros(self.num_layers * self.num_directions, x.size(0), self.hidden_size)
        if torch.cuda.is_available():
            h0 = h0.cuda()
        _, hn = self.rnn(x, h0)
        # hn: num_layers*num_directions x batch_size x hidden_size
        if self.bidirectional:
            hn = torch.cat((hn[-2], hn[-1]), dim=1)
        else:
            hn = hn[-1]
        # hn: batch_size x (num_directions * hidden_size)
        return hn


def cal_encoder_dist(seq1, seq2):
    max_len = max(len(seq1), len(seq2))
    seq1_padded = [(0, 0)] * (max_len - len(seq1)) + seq1
    seq2_padded = [(0, 0)] * (max_len - len(seq2)) + seq2

    seq1_tensor = torch.tensor(seq1_padded)
    seq2_tensor = torch.tensor(seq2_padded)

    encoder = SequenceEncoder(input_size=2, hidden_size=16, num_layers=2, bidirectional=True)
    if torch.cuda.is_available():
        encoder.cuda()

    seq1_encoding = encoder(seq1_tensor.unsqueeze(0).float())
    seq2_encoding = encoder(seq2_tensor.unsqueeze(0).float())

    # 使用余弦相似度计算相似度
    sim = nn.functional.cosine_similarity(seq1_encoding, seq2_encoding)

    return 1 - sim.item()


# 示例用法
# seq1 = [(1, 1), (2, 2), (3, 3)]
# seq2 = [(1, 1), (3, 3)]
# dist = cal_encoder_dist(seq1, seq2)
# print(dist)
